# BrndScents - Perfume Store Management System

A complete management system for an online retail perfume store built with Next.js 16, Supabase, and TypeScript.

## Features

### Authentication
- **Admin Login**: Secure login using environment variables
- **Retailer Login**: Email and password authentication via Supabase Auth
- **Role-based Access**: Separate dashboards and permissions for admins and retailers

### Admin Features
- **Dashboard**: Overview of all business metrics including retailers, products, orders, payments, and inventory
- **Retailers Management**: View all retailers, create new retailer accounts
- **Products Management**: View and manage product catalog
- **Orders Management**: View all orders across all retailers
- **Payments Management**: Track all payments received
- **Inventory Management**: Monitor stock levels across all retailers
- **Analytics**: Business insights and key performance metrics

### Retailer Features
- **Dashboard**: Personalized overview with orders, payments, revenue, and inventory
- **Orders**: View and manage own orders
- **Payments**: Track payment history
- **Inventory**: Manage product stock levels
- **Account**: View business information and account details

## Database Schema

The system includes the following tables:
- **retailers**: Business information for each retailer
- **products**: Product catalog with perfume details
- **inventory**: Stock levels per retailer
- **orders**: Customer orders
- **order_items**: Individual items in each order
- **payments**: Payment records
- **purchases**: Supplier purchases
- **expenses**: Business expenses

All tables include Row Level Security (RLS) policies for data protection.

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `ADMIN_EMAIL`: Admin login email
- `ADMIN_PASSWORD`: Admin login password
- `NEXT_PUBLIC_ADMIN_EMAIL`: Public admin email for client-side validation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in the Vercel dashboard or `.env.local`

3. The database schema has already been applied to your Supabase project

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

Use the credentials stored in your environment variables to log in as admin.

## Creating Retailers

As an admin, you can create new retailer accounts from the Admin Dashboard:
1. Navigate to "Retailers" in the sidebar
2. Click "Add Retailer"
3. Fill in the business details
4. The retailer will receive a confirmation email to activate their account

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
app/
├── admin/              # Admin pages
├── retailer/           # Retailer pages
├── auth/               # Authentication pages
components/             # Reusable components
lib/
├── supabase/          # Supabase client setup
└── auth.ts            # Authentication utilities
scripts/               # Database migration scripts
```
