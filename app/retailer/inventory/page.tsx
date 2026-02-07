import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryTable } from '@/components/inventory-table'

export default async function RetailerInventoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: inventory } = await supabase
    .from('inventory')
    .select(`
      *,
      products (
        name,
        sku,
        category
      )
    `)
    .eq('retailer_id', user.id)
    .order('updated_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
        <p className="text-muted-foreground mt-1">
          Manage your product inventory
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryTable inventory={inventory || []} />
        </CardContent>
      </Card>
    </div>
  )
}
