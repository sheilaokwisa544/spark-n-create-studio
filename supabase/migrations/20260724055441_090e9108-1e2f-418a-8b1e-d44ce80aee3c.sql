
-- =========================================================
-- ChoraNami Phase 2 Migration
-- =========================================================

-- ---------- Shared helpers ----------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ---------- Roles ----------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- ---------- Profiles ----------
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles: read own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles: update own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Profiles: insert own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
          NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------- Programs ----------
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  cta TEXT NOT NULL DEFAULT 'Book Now',
  icon TEXT NOT NULL DEFAULT 'Palette',
  color TEXT NOT NULL DEFAULT 'orange',
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.programs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.programs TO authenticated;
GRANT ALL ON public.programs TO service_role;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Programs: public read published" ON public.programs FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Programs: admin all" ON public.programs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_programs_updated BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.programs (slug,title,short,description,features,cta,icon,color,sort_order) VALUES
('school-art-clubs','School Art Clubs','Structured after-school art clubs for schools.','A full-term program that turns any school into a hub of creativity — drawing, painting, crafts, sculpture and mixed media, guided by professional instructors.',ARRAY['10 lessons per term','Professional instructors','All materials provided','End-of-term exhibitions'],'Partner With Us','GraduationCap','orange',1),
('homeschool-art-classes','Homeschool Art Classes','Personalized one-on-one or small group art lessons.','Tailored art lessons for homeschooled children — drawing, painting, colour theory, crafts, mixed media and creative thinking, at your pace.',ARRAY['1:1 or small groups','Custom curriculum','Flexible schedule','Progress portfolio'],'Book Lessons','Palette','turquoise',2),
('artogether','ArTogether','Interactive creative experiences for organizations.','Bring your school, church, company or community together with hands-on painting experiences: canvas painting, tote bag painting or t-shirt painting.',ARRAY['Canvas painting','Tote bag painting','T-shirt painting','Minimum 50 participants'],'Book ArTogether','Users','purple',3),
('party-boom','Party Boom','On-site creative entertainment for kids'' events.','The ultimate creative party experience — painting stations, crafts, creative games and group art projects delivered straight to your venue.',ARRAY['Canvas painting','Painting stations & crafts','Creative games','Group art projects'],'Book Party Boom','PartyPopper','yellow',4);

-- ---------- Events ----------
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  location TEXT,
  capacity INT,
  price_text TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events: public read published" ON public.events FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Events: admin all" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.events (slug,title,description,starts_at,location,capacity,price_text,status,featured) VALUES
('holiday-art-camp-2026','Holiday Art Camp 2026','A week-long immersive art adventure for kids ages 6–12. Painting, sculpture, mixed media and a final exhibition for parents.',now() + interval '30 days','Nairobi, Karen',30,'KES 8,500','upcoming',true),
('family-canvas-night','Family Canvas Night','A cosy evening of family canvas painting — bring the whole family and take home your masterpiece.',now() + interval '14 days','ChoraNami Studio, Westlands',40,'KES 2,500 / person','upcoming',true),
('school-exhibition-2025','End-of-Term School Exhibition','Celebrating a term of creativity from our partner schools across Nairobi.',now() - interval '45 days','Sarit Centre',200,'Free','past',false);

-- ---------- Gallery ----------
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  width INT,
  height INT,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery: public read published" ON public.gallery_images FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Gallery: admin all" ON public.gallery_images FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_gallery_updated BEFORE UPDATE ON public.gallery_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- Testimonials ----------
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  rating INT NOT NULL DEFAULT 5,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Testimonials: public read published" ON public.testimonials FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Testimonials: admin all" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.testimonials (name,role,quote,rating,featured,sort_order) VALUES
('Grace M.','Parent, Nairobi','ChoraNami has been transformative for my daughter. She used to be shy — now she paints with such confidence.',5,true,1),
('St. Mary''s Academy','Partner School','The art club has become the most anticipated activity of the week. Parents keep asking for more terms.',5,true,2),
('James O.','Party Boom Client','Best birthday party ever. The kids didn''t want to leave. Highly professional team and beautifully organised.',5,true,3),
('Aisha K.','Homeschool Mum','The one-on-one lessons meet my son exactly where he is. He now has a whole portfolio of work he''s proud of.',5,false,4),
('Baraka Corp','ArTogether Client','Our team-building day was unforgettable. Painting together broke down barriers we didn''t know existed.',5,false,5);

-- ---------- FAQs ----------
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'General',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs: public read published" ON public.faqs FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "FAQs: admin all" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.faqs (category,question,answer,sort_order) VALUES
('General','What ages do you cater to?','Our programs are designed for children aged 4–14, with age-appropriate lessons and materials for each group.',1),
('General','Where do you operate?','We''re based in Nairobi, Kenya and travel to schools, homes and event venues across the country by arrangement.',2),
('Programs','Do you provide materials?','Yes — all materials are included in every program. Children arrive ready to create.',3),
('Programs','How long is a school term program?','Our school art clubs run for 10 lessons per school term, typically once a week.',4),
('Programs','What''s the minimum for ArTogether?','ArTogether experiences require a minimum booking of 50 participants.',5),
('Booking','Can we book a birthday on short notice?','We recommend booking Party Boom at least two weeks in advance, but reach out — we''ll try to make it work.',6),
('Pricing','Do you offer payment plans?','For school clubs and long-term partnerships, we''re happy to structure payments per term. Contact us for details.',7);

-- ---------- Bookings ----------
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_slug TEXT,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  child_age TEXT,
  participants INT,
  preferred_date DATE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Bookings: public insert" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Bookings: admin all" ON public.bookings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- Contact messages ----------
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contact: public insert" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Contact: admin all" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_contact_updated BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- Newsletter subscribers ----------
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Newsletter: public insert" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Newsletter: admin read" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Newsletter: admin modify" ON public.newsletter_subscribers FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Newsletter: admin delete" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
