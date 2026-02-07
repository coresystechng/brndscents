import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function RetailerAccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: retailer } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!retailer) {
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your account information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Business Name
              </p>
              <p className="text-lg">{retailer.business_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Contact Person
              </p>
              <p className="text-lg">{retailer.contact_person}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Email
              </p>
              <p className="text-lg">{retailer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Phone
              </p>
              <p className="text-lg">{retailer.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">
                Address
              </p>
              <p className="text-lg">{retailer.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Account Status
              </p>
              <p className="text-lg">
                {retailer.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Member Since
              </p>
              <p className="text-lg">
                {new Date(retailer.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
