-- Complete Perfume Store Management System Schema
-- This script sets up the entire database with all tables, indexes, and RLS policies

-- Drop existing tables if they exist
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS retailers CASCADE;

-- Create retailers table
CREATE TABLE public.retailers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  tax_id TEXT,
  bank_account TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  sku TEXT UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2),
  category TEXT,
  volume_ml INTEGER,
  fragrance_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_in_stock INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  last_restocked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(retailer_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL(12, 2) NOT NULL,
  payment_status TEXT DEFAULT 'unpaid',
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_country TEXT,
  shipping_postal_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reference_number TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10, 2) NOT NULL,
  total_cost DECIMAL(12, 2) NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivery_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending',
  reference_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID NOT NULL REFERENCES public.retailers(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(12, 2) NOT NULL,
  expense_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  receipt_url TEXT,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for retailers table
CREATE POLICY "retailers_select_own" ON public.retailers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "retailers_select_admin" ON public.retailers FOR SELECT USING (auth.jwt() ->> 'role' = 'authenticated');
CREATE POLICY "retailers_insert_own" ON public.retailers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "retailers_update_own" ON public.retailers FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for products table (public read)
CREATE POLICY "products_select_all" ON public.products FOR SELECT USING (true);
CREATE POLICY "products_insert_admin" ON public.products FOR INSERT WITH CHECK (false);

-- RLS Policies for inventory table
CREATE POLICY "inventory_select_own" ON public.inventory FOR SELECT USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "inventory_insert_own" ON public.inventory FOR INSERT WITH CHECK (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "inventory_update_own" ON public.inventory FOR UPDATE USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "inventory_delete_own" ON public.inventory FOR DELETE USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);

-- RLS Policies for orders table
CREATE POLICY "orders_select_own" ON public.orders FOR SELECT USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT WITH CHECK (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "orders_update_own" ON public.orders FOR UPDATE USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);

-- RLS Policies for order_items table
CREATE POLICY "order_items_select_own" ON public.order_items FOR SELECT USING (
  order_id IN (
    SELECT id FROM public.orders WHERE retailer_id IN (
      SELECT id FROM public.retailers WHERE user_id = auth.uid()
    )
  )
);
CREATE POLICY "order_items_insert_own" ON public.order_items FOR INSERT WITH CHECK (
  order_id IN (
    SELECT id FROM public.orders WHERE retailer_id IN (
      SELECT id FROM public.retailers WHERE user_id = auth.uid()
    )
  )
);

-- RLS Policies for payments table
CREATE POLICY "payments_select_own" ON public.payments FOR SELECT USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "payments_insert_own" ON public.payments FOR INSERT WITH CHECK (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);

-- RLS Policies for purchases table
CREATE POLICY "purchases_select_own" ON public.purchases FOR SELECT USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "purchases_insert_own" ON public.purchases FOR INSERT WITH CHECK (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "purchases_update_own" ON public.purchases FOR UPDATE USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);

-- RLS Policies for expenses table
CREATE POLICY "expenses_select_own" ON public.expenses FOR SELECT USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "expenses_insert_own" ON public.expenses FOR INSERT WITH CHECK (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);
CREATE POLICY "expenses_update_own" ON public.expenses FOR UPDATE USING (
  retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid())
);

-- Create indexes for better query performance
CREATE INDEX idx_retailers_user_id ON public.retailers(user_id);
CREATE INDEX idx_inventory_retailer_id ON public.inventory(retailer_id);
CREATE INDEX idx_inventory_product_id ON public.inventory(product_id);
CREATE INDEX idx_orders_retailer_id ON public.orders(retailer_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_payments_retailer_id ON public.payments(retailer_id);
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_purchases_retailer_id ON public.purchases(retailer_id);
CREATE INDEX idx_expenses_retailer_id ON public.expenses(retailer_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_payments_created_at ON public.payments(created_at);

-- Create trigger to auto-create retailer profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.retailers (user_id, business_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'business_name', 'My Business')
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
