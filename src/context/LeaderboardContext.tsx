// app/context/LeaderboardContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type LeaderboardContextType = {
  searchText: string
  setSearchText: (text: string) => void
  viewType: 'view1' | 'view2'
  toggleViewType: () => void
  headers: {header: string, headerKey: string}[]
  setHeaders: (newHeader: {header: string, headerKey: string}[]) => void
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined)

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState<string>('')
  const [viewType, setViewType] = useState<'view1' | 'view2'>('view1')
  const [headers, setHeaders] = useState<{header: string, headerKey: string}[]>([])

  const toggleViewType = () => {
    setViewType((prevType) => (prevType === 'view1' ? 'view2' : 'view1'))
  }

  return (
    <LeaderboardContext.Provider
      value={{
        searchText,
        setSearchText,
        viewType,
        toggleViewType,
        headers, 
        setHeaders
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  )
}

export const useLeaderboardContext = () => {
  const context = useContext(LeaderboardContext)
  if (!context) {
    throw new Error('useLeaderboardContext must be used within a LeaderboardProvider')
  }
  return context
}
