'use client'

import { useSupabase } from './useSupabase'

export function useRequireAuth() {
  const { session, isLoading, isSupabaseConfigured } = useSupabase()

  return {
    isLoading,
    isDemoMode: !isSupabaseConfigured || !session,
    isAuthenticated: Boolean(session),
  }
}
