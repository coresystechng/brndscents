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

interface Payment {
  id: string
  payment_method: string
  amount_paid: number
  payment_date: string
  payment_status: string
  orders?: {
    order_number: string
  }
  retailers?: {
    business_name: string
  }
}

interface PaymentsTableProps {
  payments: Payment[]
  showRetailer?: boolean
}

const statusColors = {
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export function PaymentsTable({ payments, showRetailer = false }: PaymentsTableProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No payments found
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Number</TableHead>
            {showRetailer && <TableHead>Retailer</TableHead>}
            <TableHead>Payment Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                #{payment.orders?.order_number || 'N/A'}
              </TableCell>
              {showRetailer && (
                <TableCell>
                  {payment.retailers?.business_name || 'N/A'}
                </TableCell>
              )}
              <TableCell className="capitalize">
                {payment.payment_method.replace('_', ' ')}
              </TableCell>
              <TableCell className="font-semibold">
                ₦{Number(payment.amount_paid).toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={statusColors[payment.payment_status as keyof typeof statusColors]}
                >
                  {payment.payment_status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(payment.payment_date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
