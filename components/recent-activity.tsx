import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  order_items?: Array<{
    quantity: number
    unit_price: number
  }>
}

interface RecentActivityProps {
  orders: Order[]
}

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export function RecentActivity({ orders }: RecentActivityProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent orders
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const total = order.order_items?.reduce(
          (sum, item) => sum + Number(item.unit_price) * item.quantity,
          0
        ) || Number(order.total_amount)

        return (
          <div
            key={order.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Order #{order.order_number}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(order.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={statusColors[order.status as keyof typeof statusColors]}
              >
                {order.status}
              </Badge>
              <p className="text-sm font-semibold">
                ₦{total.toLocaleString()}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
