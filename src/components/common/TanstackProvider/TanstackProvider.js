'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevTools } from '@tanstack/react-query'

const TanstackProvider = ({ children }) => {
    const [queryClient] = React.useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                staleTime: 120 * 1000,
              },
            },
          }),
      )
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevTools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default TanstackProvider