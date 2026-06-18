'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSupabase } from './useSupabase'

export function useRequireAuth() {
  const router = useRouter()
  const { session, isLoading, isSupabaseConfigured } = useSupabase()

  useEffect(() => {
    if (!isLoading && (!isSupabaseConfigured || !session)) {
      router.replace('/auth')
    }
  }, [isLoading, isSupabaseConfigured, router, session])

  return {
    isLoading: isLoading || !session,
    isAuthenticated: Boolean(session),
  }
}
