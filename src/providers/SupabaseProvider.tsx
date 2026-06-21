'use client'

import { ReactNode, useEffect, useState } from 'react'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isSupabaseConfigured) {
      getSupabaseClient()
    }

    setIsReady(true)
  }, [])

  if (!isReady) return null

  return <>{children}</>
}
