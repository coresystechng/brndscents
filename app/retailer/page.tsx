import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react'
import { RecentActivity } from '@/components/recent-activity'

export default async function RetailerDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Get summary statistics
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('retailer_id', user.id)
    .order('created_at', { ascending: false })

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('retailer_id', user.id)

  const { data: inventory } = await supabase
    .from('inventory')
    .select('*')
    .eq('retailer_id', user.id)

  // Calculate totals
  const totalOrders = orders?.length || 0
  const totalPayments = payments?.reduce((sum, p) => sum + Number(p.amount_paid), 0) || 0
  const totalProfit = orders?.reduce((sum, order) => {
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
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {'Welcome back! Here\'s an overview of your business.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              ₦{totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventoryItems}</div>
            <p className="text-xs text-muted-foreground">Items in stock</p>
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
