import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  // Get analytics data
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')

  const { data: payments } = await supabase
    .from('payments')
    .select('*')

  const { data: retailers } = await supabase
    .from('retailers')
    .select('*')
    .eq('is_active', true)

  // Calculate metrics
  const totalRevenue = orders?.reduce((sum, order) => {
    const orderTotal = order.order_items?.reduce(
      (itemSum: number, item: any) => itemSum + Number(item.unit_price) * item.quantity,
      0
    ) || 0
    return sum + orderTotal
  }, 0) || 0

  const totalPaymentsReceived = payments?.reduce(
    (sum, p) => sum + Number(p.amount_paid),
    0
  ) || 0

  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0
  const completedOrders = orders?.filter(o => o.status === 'delivered').length || 0

  const activeRetailers = retailers?.length || 0

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          View business insights and metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ₦{totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              From all orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payments Received</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ₦{totalPaymentsReceived.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Total collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Retailers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeRetailers}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingOrders}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedOrders}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ₦{(totalRevenue - totalPaymentsReceived).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Pending collection
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
