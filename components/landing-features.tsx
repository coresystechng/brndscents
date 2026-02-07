'use client'

import { ShoppingCart, Package, CreditCard, BarChart3 } from 'lucide-react'

export function LandingFeatures() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Order Management',
      description: 'Track and manage all customer orders in real-time with detailed analytics'
    },
    {
      icon: Package,
      title: 'Inventory Tracking',
      description: 'Monitor stock levels, set alerts, and optimize inventory distribution'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Secure payment tracking and reconciliation for all transactions'
    },
    {
      icon: BarChart3,
      title: 'Business Analytics',
      description: 'Gain insights into sales trends, profit margins, and performance metrics'
    }
  ]

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to run a successful perfume retail business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-lg p-8 border border-slate-200 hover:border-slate-300 transition-colors">
                <Icon className="w-12 h-12 text-violet-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
