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

interface Inventory {
  id: string
  quantity: number
  location: string
  updated_at: string
  products?: {
    name: string
    sku: string
    category: string
  }
  retailers?: {
    business_name: string
  }
}

interface InventoryTableProps {
  inventory: Inventory[]
  showRetailer?: boolean
}

export function InventoryTable({ inventory, showRetailer = false }: InventoryTableProps) {
  if (inventory.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No inventory items found
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            {showRetailer && <TableHead>Retailer</TableHead>}
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => {
            const isLowStock = item.quantity < 10
            
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.products?.name || 'N/A'}
                </TableCell>
                <TableCell>{item.products?.sku || 'N/A'}</TableCell>
                <TableCell className="capitalize">
                  {item.products?.category || 'N/A'}
                </TableCell>
                {showRetailer && (
                  <TableCell>
                    {item.retailers?.business_name || 'N/A'}
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.quantity}</span>
                    {isLowStock && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {new Date(item.updated_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
