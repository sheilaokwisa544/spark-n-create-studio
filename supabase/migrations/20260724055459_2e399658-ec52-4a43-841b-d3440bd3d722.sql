
-- Restrict SECURITY DEFINER function execution
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Replace always-true INSERT policies with lightweight sanity checks
DROP POLICY IF EXISTS "Bookings: public insert" ON public.bookings;
CREATE POLICY "Bookings: public insert" ON public.bookings FOR INSERT TO anon, authenticated
  WITH CHECK (
    parent_name IS NOT NULL AND length(trim(parent_name)) > 1
    AND email IS NOT NULL AND email LIKE '%_@_%._%'
    AND phone IS NOT NULL AND length(trim(phone)) >= 6
  );

DROP POLICY IF EXISTS "Contact: public insert" ON public.contact_messages;
CREATE POLICY "Contact: public insert" ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 1
    AND email IS NOT NULL AND email LIKE '%_@_%._%'
    AND message IS NOT NULL AND length(trim(message)) >= 5
  );

DROP POLICY IF EXISTS "Newsletter: public insert" ON public.newsletter_subscribers;
CREATE POLICY "Newsletter: public insert" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND email LIKE '%_@_%._%'
  );
