-- Enable RLS on all tables
ALTER TABLE public.retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Retailers RLS policies - Allow users to create their own profile and view all
CREATE POLICY "retailers_insert_own" ON public.retailers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "retailers_select_own" ON public.retailers FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "retailers_update_own" ON public.retailers FOR UPDATE USING (auth.uid() = user_id);

-- Products RLS - Everyone can view, admins only can insert/update
CREATE POLICY "products_select_all" ON public.products FOR SELECT USING (true);
CREATE POLICY "products_insert_admin" ON public.products FOR INSERT WITH CHECK (auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "products_update_admin" ON public.products FOR UPDATE USING (auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));

-- Inventory RLS - Users see their own inventory
CREATE POLICY "inventory_select_own" ON public.inventory FOR SELECT USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "inventory_insert_own" ON public.inventory FOR INSERT WITH CHECK (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));
CREATE POLICY "inventory_update_own" ON public.inventory FOR UPDATE USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));

-- Orders RLS - Users see their own orders
CREATE POLICY "orders_select_own" ON public.orders FOR SELECT USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT WITH CHECK (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));
CREATE POLICY "orders_update_own" ON public.orders FOR UPDATE USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));

-- Order items RLS - Follow order access
CREATE POLICY "order_items_select_own" ON public.order_items FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin')));

-- Payments RLS - Users see their own payments
CREATE POLICY "payments_select_own" ON public.payments FOR SELECT USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "payments_insert_own" ON public.payments FOR INSERT WITH CHECK (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));
CREATE POLICY "payments_update_own" ON public.payments FOR UPDATE USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));

-- Purchases RLS - Users see their own purchases
CREATE POLICY "purchases_select_own" ON public.purchases FOR SELECT USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "purchases_insert_own" ON public.purchases FOR INSERT WITH CHECK (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));
CREATE POLICY "purchases_update_own" ON public.purchases FOR UPDATE USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));

-- Expenses RLS - Users see their own expenses
CREATE POLICY "expenses_select_own" ON public.expenses FOR SELECT USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
CREATE POLICY "expenses_insert_own" ON public.expenses FOR INSERT WITH CHECK (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));
CREATE POLICY "expenses_update_own" ON public.expenses FOR UPDATE USING (retailer_id IN (SELECT id FROM public.retailers WHERE user_id = auth.uid()));
