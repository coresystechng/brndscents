import { redirect } from 'next/navigation'
import { getUserProfile } from '@/lib/auth'
import { CreateRetailerForm } from '@/components/create-retailer-form'

export default async function CreateRetailerPage() {
  const profile = await getUserProfile()

  if (!profile || profile.role !== 'admin') {
    redirect('/auth/login')
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Retailer</h1>
        <p className="text-muted-foreground mt-2">
          Add a new retailer to the system
        </p>
      </div>
      <CreateRetailerForm />
    </div>
  )
}
