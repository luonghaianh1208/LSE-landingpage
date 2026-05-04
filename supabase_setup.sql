-- 1. Create Profiles table for RBAC (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Trigger to automatically create a profile when a new user signs up via Google
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Modify existing leads table for CRM features
-- Assuming `leads` table already exists, we just add the status column if it doesn't exist.
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='status') THEN
    ALTER TABLE public.leads ADD COLUMN status text DEFAULT 'new';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='care_notes') THEN
    ALTER TABLE public.leads ADD COLUMN care_notes text;
  END IF;
END $$;

-- 3. Create Products table for dynamic LDP
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  features jsonb DEFAULT '[]'::jsonb,
  image_url text,
  link text,
  segment text,
  status text DEFAULT 'live',
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. Create Site Content table for LDP text CMS
CREATE TABLE IF NOT EXISTS public.site_content (
  section_key text PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Insert default site content to prevent empty LDP
INSERT INTO public.site_content (section_key, content) VALUES
('hero', '{"title": "Số hóa Giáo dục đồng hành cùng Giáo viên & Trung tâm phát triển bền vững", "description": "Lam Sơn Edutech (LSE) cung cấp hệ sinh thái giải pháp AI và chuyển đổi số toàn diện — từ phòng học đến phòng họp, từ giáo viên đến nhà quản lý."}'),
('mission', '{"title": "Biến trí tuệ nhân tạo thành người bạn đồng hành của mỗi giáo viên, mỗi học sinh và mỗi tổ chức giáo dục Việt Nam", "subtitle": "Chúng tôi không chỉ xây dựng phần mềm — chúng tôi kiến tạo nền tảng để giáo viên dạy tốt hơn, học sinh học sâu hơn, và nhà trường vận hành thông minh hơn."}')
ON CONFLICT (section_key) DO NOTHING;

-- 5. Setup Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Anyone can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admins can insert product images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'product-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE USING (
  bucket_id = 'product-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
