import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingCart, TrendingUp, Users, Store, Package } from 'lucide-react'
import { RecentActivity } from '@/components/recent-activity'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get all data for admin overview
  const { data: retailers } = await supabase
    .from('retailers')
    .select('*')

  const { data: products } = await supabase
    .from('products')
    .select('*')

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  const { data: payments } = await supabase
    .from('payments')
    .select('*')

  const { data: inventory } = await supabase
    .from('inventory')
    .select('*')

  // Calculate totals
  const totalRetailers = retailers?.length || 0
  const totalProducts = products?.length || 0
  const totalOrders = orders?.length || 0
  const totalPayments = payments?.reduce((sum, p) => sum + Number(p.amount_paid), 0) || 0
  const totalRevenue = orders?.reduce((sum, order) => {
    const orderTotal = order.order_items?.reduce(
      (itemSum: number, item: any) => itemSum + Number(item.unit_price) * item.quantity,
      0
    ) || 0
    return sum + orderTotal
  }, 0) || 0
  const totalInventoryItems = inventory?.reduce((sum, item) => sum + item.quantity, 0) || 0

  // Get recent orders for activity
  const recentOrders = orders?.slice(0, 5) || []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {'Manage your perfume retail store from one place.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Retailers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRetailers}</div>
            <p className="text-xs text-muted-foreground">Active retailers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">In catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventoryItems}</div>
            <p className="text-xs text-muted-foreground">Items in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{totalPayments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity orders={recentOrders} />
        </CardContent>
      </Card>
    </div>
  )
}
