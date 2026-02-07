'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin session exists
    const adminSession = localStorage.getItem('adminSession')
    
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession)
        // Check if session is still valid (not older than 24 hours)
        if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthorized(true)
          setIsLoading(false)
          return
        }
      } catch (e) {
        // Invalid session
      }
    }

    // No valid session, redirect to login
    setIsLoading(false)
    redirect('/auth/login')
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userType="admin" userName="Administrator" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
