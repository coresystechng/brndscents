import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryTable } from '@/components/inventory-table'

export default async function AdminInventoryPage() {
  const supabase = await createClient()

  const { data: inventory } = await supabase
    .from('inventory')
    .select(`
      *,
      products (
        name,
        sku,
        category
      ),
      retailers (
        business_name
      )
    `)
    .order('updated_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
        <p className="text-muted-foreground mt-1">
          View all inventory across retailers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryTable inventory={inventory || []} showRetailer />
        </CardContent>
      </Card>
    </div>
  )
}
