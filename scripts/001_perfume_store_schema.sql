-- Perfume Store Management System Database Schema

-- Create retailers table (extends profiles)
CREATE TABLE IF NOT EXISTS public.retailers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  category TEXT,
  size TEXT,
  unit_price DECIMAL(10, 2) NOT NULL,
  cost_price DECIMAL(10, 2),
  sku TEXT UNIQUE,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  last_restocked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, retailer_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('cash', 'card', 'transfer', 'mobile')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_reference TEXT,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table (inventory restocking)
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_number TEXT UNIQUE NOT NULL,
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,
  supplier_contact TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'cancelled')),
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchase_items table
CREATE TABLE IF NOT EXISTS public.purchase_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID NOT NULL REFERENCES public.purchases(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  expense_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for retailers table
CREATE POLICY "retailers_view_own" ON public.retailers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "retailers_update_own" ON public.retailers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "admins_view_all_retailers" ON public.retailers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_insert_retailers" ON public.retailers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_update_retailers" ON public.retailers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_delete_retailers" ON public.retailers
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for products table
CREATE POLICY "products_view_all" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "admins_manage_products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for inventory table
CREATE POLICY "retailers_view_own_inventory" ON public.inventory
  FOR SELECT USING (retailer_id = auth.uid());

CREATE POLICY "retailers_manage_own_inventory" ON public.inventory
  FOR ALL USING (retailer_id = auth.uid());

CREATE POLICY "admins_view_all_inventory" ON public.inventory
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_manage_inventory" ON public.inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for orders table
CREATE POLICY "retailers_view_own_orders" ON public.orders
  FOR SELECT USING (retailer_id = auth.uid());

CREATE POLICY "retailers_manage_own_orders" ON public.orders
  FOR ALL USING (retailer_id = auth.uid());

CREATE POLICY "admins_view_all_orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_manage_orders" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for order_items table
CREATE POLICY "order_items_view_own" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.retailer_id = auth.uid()
    )
  );

CREATE POLICY "order_items_manage_own" ON public.order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.retailer_id = auth.uid()
    )
  );

CREATE POLICY "admins_manage_order_items" ON public.order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for payments table
CREATE POLICY "retailers_view_own_payments" ON public.payments
  FOR SELECT USING (retailer_id = auth.uid());

CREATE POLICY "retailers_manage_own_payments" ON public.payments
  FOR ALL USING (retailer_id = auth.uid());

CREATE POLICY "admins_view_all_payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_manage_payments" ON public.payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for purchases table
CREATE POLICY "retailers_view_own_purchases" ON public.purchases
  FOR SELECT USING (retailer_id = auth.uid());

CREATE POLICY "retailers_manage_own_purchases" ON public.purchases
  FOR ALL USING (retailer_id = auth.uid());

CREATE POLICY "admins_view_all_purchases" ON public.purchases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_manage_purchases" ON public.purchases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for purchase_items table
CREATE POLICY "purchase_items_view_own" ON public.purchase_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.purchases
      WHERE purchases.id = purchase_items.purchase_id
      AND purchases.retailer_id = auth.uid()
    )
  );

CREATE POLICY "purchase_items_manage_own" ON public.purchase_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.purchases
      WHERE purchases.id = purchase_items.purchase_id
      AND purchases.retailer_id = auth.uid()
    )
  );

CREATE POLICY "admins_manage_purchase_items" ON public.purchase_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for expenses table
CREATE POLICY "retailers_view_own_expenses" ON public.expenses
  FOR SELECT USING (retailer_id = auth.uid());

CREATE POLICY "retailers_manage_own_expenses" ON public.expenses
  FOR ALL USING (retailer_id = auth.uid());

CREATE POLICY "admins_view_all_expenses" ON public.expenses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "admins_manage_expenses" ON public.expenses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create trigger function for auto-creating retailer profile
CREATE OR REPLACE FUNCTION public.handle_new_retailer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only create retailer profile if role is 'retailer'
  IF (NEW.raw_user_meta_data->>'role' = 'retailer') THEN
    INSERT INTO public.retailers (id, business_name, contact_phone, address, city, state, country)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'business_name', 'Unnamed Business'),
      COALESCE(NEW.raw_user_meta_data->>'contact_phone', NULL),
      COALESCE(NEW.raw_user_meta_data->>'address', NULL),
      COALESCE(NEW.raw_user_meta_data->>'city', NULL),
      COALESCE(NEW.raw_user_meta_data->>'state', NULL),
      COALESCE(NEW.raw_user_meta_data->>'country', NULL)
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created_retailer ON auth.users;
CREATE TRIGGER on_auth_user_created_retailer
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_retailer();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_retailers_status ON public.retailers(status);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_retailer ON public.inventory(retailer_id);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON public.inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_retailer ON public.orders(retailer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_retailer ON public.payments(retailer_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_purchases_retailer ON public.purchases(retailer_id);
CREATE INDEX IF NOT EXISTS idx_purchase_items_purchase ON public.purchase_items(purchase_id);
CREATE INDEX IF NOT EXISTS idx_expenses_retailer ON public.expenses(retailer_id);
