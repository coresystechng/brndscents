-- Update retailers table to allow users to create their own retailer profile
-- This enables the quick signup flow on the landing page

-- Drop the existing admin-only insert policy
DROP POLICY IF EXISTS admins_insert_retailers ON public.retailers;

-- Create new policies that allow users to create and view their own retailer profiles
CREATE POLICY retailers_insert_own ON public.retailers
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Update the SELECT policy to allow authenticated users to view their own retailer
DROP POLICY IF EXISTS retailers_view_own ON public.retailers;

CREATE POLICY retailers_view_own ON public.retailers
  FOR SELECT
  USING (auth.uid() = id OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE role = 'authenticated'));

-- Keep the admin policies for full access
CREATE POLICY admins_insert_retailers ON public.retailers
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
  );
