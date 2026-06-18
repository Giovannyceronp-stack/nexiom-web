'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from './useSupabase'

export function useRequireAuth() {
  const { session, isLoading, isSupabaseConfigured } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!isSupabaseConfigured) return

    if (!isLoading && !session) {
      router.push('/auth')
    }
  }, [session, isLoading, isSupabaseConfigured, router])

  return {
    isLoading,
    isDemoMode: !isSupabaseConfigured,
    isAuthenticated: Boolean(session),
  }
}
