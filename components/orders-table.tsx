'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  order_items?: Array<{
    id: string
    quantity: number
    unit_price: number
    products?: {
      name: string
      sku: string
    }
  }>
  retailers?: {
    business_name: string
  }
}

interface OrdersTableProps {
  orders: Order[]
  showRetailer?: boolean
}

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export function OrdersTable({ orders, showRetailer = false }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No orders found
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              {showRetailer && <TableHead>Retailer</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const itemCount = order.order_items?.length || 0
              const total = order.order_items?.reduce(
                (sum, item) => sum + Number(item.unit_price) * item.quantity,
                0
              ) || Number(order.total_amount)

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    #{order.order_number}
                  </TableCell>
                  {showRetailer && (
                    <TableCell>
                      {order.retailers?.business_name || 'N/A'}
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[order.status as keyof typeof statusColors]}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{itemCount}</TableCell>
                  <TableCell>₦{total.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Order Number
                  </p>
                  <p className="text-lg font-semibold">
                    #{selectedOrder.order_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    variant="outline"
                    className={statusColors[selectedOrder.status as keyof typeof statusColors]}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
                {showRetailer && selectedOrder.retailers && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Retailer
                    </p>
                    <p className="text-lg">
                      {selectedOrder.retailers.business_name}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Date
                  </p>
                  <p className="text-lg">
                    {new Date(selectedOrder.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Order Items
                </p>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.order_items?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.products?.name || 'N/A'}</TableCell>
                          <TableCell>{item.products?.sku || 'N/A'}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₦{Number(item.unit_price).toLocaleString()}</TableCell>
                          <TableCell>
                            ₦{(Number(item.unit_price) * item.quantity).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold">
                    ₦{(selectedOrder.order_items?.reduce(
                      (sum, item) => sum + Number(item.unit_price) * item.quantity,
                      0
                    ) || Number(selectedOrder.total_amount)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
