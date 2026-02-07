'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function LandingHero() {
  return (
    <div className="pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
          Trusted by retailers worldwide
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Manage Your Perfume Retail Business
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
            All in One Place
          </span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Streamline orders, inventory, payments, and business insights with our comprehensive retail management platform designed for perfume retailers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#signup">
            <Button size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
          <div>
            <div className="text-3xl font-bold text-slate-900">500+</div>
            <p className="text-slate-600">Active Retailers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">$10M+</div>
            <p className="text-slate-600">Orders Managed</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">99.9%</div>
            <p className="text-slate-600">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  )
}
