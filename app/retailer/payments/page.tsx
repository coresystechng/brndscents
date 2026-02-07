import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentsTable } from '@/components/payments-table'

export default async function RetailerPaymentsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: payments } = await supabase
    .from('payments')
    .select(`
      *,
      orders (
        order_number
      )
    `)
    .eq('retailer_id', user.id)
    .order('payment_date', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground mt-1">
          View and track your payments
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentsTable payments={payments || []} />
        </CardContent>
      </Card>
    </div>
  )
}
