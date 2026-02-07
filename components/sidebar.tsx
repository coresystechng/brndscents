'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Package,
  User,
  LogOut,
  Users,
  Store,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  userType: 'retailer' | 'admin'
  userName: string
}

const retailerLinks = [
  {
    href: '/retailer',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/retailer/orders',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    href: '/retailer/payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    href: '/retailer/inventory',
    label: 'Inventory',
    icon: Package,
  },
  {
    href: '/retailer/account',
    label: 'Account',
    icon: User,
  },
]

const adminLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/retailers',
    label: 'Retailers',
    icon: Users,
  },
  {
    href: '/admin/products',
    label: 'Products',
    icon: Store,
  },
  {
    href: '/admin/orders',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    href: '/admin/payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    href: '/admin/inventory',
    label: 'Inventory',
    icon: Package,
  },
  {
    href: '/admin/analytics',
    label: 'Analytics',
    icon: TrendingUp,
  },
]

export function Sidebar({ userType, userName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const links = userType === 'admin' ? adminLinks : retailerLinks

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">BrndScents</h1>
        <p className="text-sm text-muted-foreground mt-1">{userName}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </aside>
  )
}
