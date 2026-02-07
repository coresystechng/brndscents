import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { RetailersTable } from '@/components/retailers-table'

export default async function RetailersPage() {
  const supabase = await createClient()

  const { data: retailers } = await supabase
    .from('retailers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Retailers</h1>
          <p className="text-muted-foreground mt-1">
            Manage all retailers in the system
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/create-retailer">
            <Plus className="h-4 w-4 mr-2" />
            Add Retailer
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Retailers</CardTitle>
        </CardHeader>
        <CardContent>
          <RetailersTable retailers={retailers || []} />
        </CardContent>
      </Card>
    </div>
  )
}
