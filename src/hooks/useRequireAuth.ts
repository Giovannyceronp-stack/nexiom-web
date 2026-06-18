'use client'

import { useSupabase } from './useSupabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireAuth() {
  const { session, isLoading } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/auth')
    }
  }, [session, isLoading, router])

  return { isLoading }
}
