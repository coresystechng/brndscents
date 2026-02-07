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

interface Retailer {
  id: string
  business_name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
  created_at: string
}

interface RetailersTableProps {
  retailers: Retailer[]
}

export function RetailersTable({ retailers }: RetailersTableProps) {
  if (retailers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No retailers found
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {retailers.map((retailer) => (
            <TableRow key={retailer.id}>
              <TableCell className="font-medium">{retailer.business_name}</TableCell>
              <TableCell>{retailer.contact_person}</TableCell>
              <TableCell>{retailer.email}</TableCell>
              <TableCell>{retailer.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={retailer.is_active ? 'default' : 'secondary'}
                >
                  {retailer.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(retailer.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
