import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/sidebar'

export default async function AdminLayout({
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

  if (!isAdmin) {
    redirect('/retailer')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userType="admin" userName="Administrator" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
