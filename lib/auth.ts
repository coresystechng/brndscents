import { createClient } from '@/lib/supabase/server'

export type UserRole = 'admin' | 'retailer'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  business_name?: string
  contact_phone?: string
  address?: string
  created_at: string
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient()
  const user = await getUser()

  if (!user || !user.email) return null

  // Check if admin
  if (user.email === process.env.ADMIN_EMAIL) {
    return {
      id: user.id,
      email: user.email,
      role: 'admin',
      created_at: user.created_at || new Date().toISOString(),
    }
  }

  // Get retailer profile
  const { data: retailer } = await supabase
    .from('retailers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (retailer) {
    return {
      id: user.id,
      email: user.email,
      role: 'retailer',
      business_name: retailer.business_name,
      contact_phone: retailer.contact_phone,
      address: retailer.address,
      created_at: user.created_at || new Date().toISOString(),
    }
  }

  return null
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
