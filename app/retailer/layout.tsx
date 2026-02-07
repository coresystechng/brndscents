import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/sidebar'

export default async function RetailerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const isAdmin = user.user_metadata?.is_admin === true

  if (isAdmin) {
    redirect('/admin')
  }

  // Get retailer profile
  const { data: retailer } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!retailer) {
    redirect('/auth/error')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userType="retailer" userName={retailer.business_name} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
