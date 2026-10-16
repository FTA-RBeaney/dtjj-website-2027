-- Create a profile row whenever a new auth user is created.
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  RETURN new;
END;
$$;
--> statement-breakpoint
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
--> statement-breakpoint
-- Keep profiles.email in sync when a user changes their email.
CREATE FUNCTION public.handle_user_email_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  UPDATE public.profiles SET email = new.email WHERE id = new.id;
  RETURN new;
END;
$$;
--> statement-breakpoint
CREATE TRIGGER on_auth_user_email_changed
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW WHEN (old.email IS DISTINCT FROM new.email)
  EXECUTE FUNCTION public.handle_user_email_change();
--> statement-breakpoint
-- Backfill profiles for users who signed up before this migration.
INSERT INTO public.profiles (id, email, first_name, last_name)
SELECT id, email, raw_user_meta_data ->> 'first_name', raw_user_meta_data ->> 'last_name'
FROM auth.users
ON CONFLICT (id) DO NOTHING;
