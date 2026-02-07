import { CreateRetailerForm } from '@/components/create-retailer-form'

export default async function CreateRetailerPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Retailer Account</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to create a new retailer account
        </p>
      </div>
      <CreateRetailerForm />
    </div>
  )
}
