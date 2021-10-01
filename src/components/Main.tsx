import React from 'react'
import { Content } from './Content'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../utils/query-client';

export const Main = () => (
  <QueryClientProvider client={queryClient}>
    <main>
      <Content />
    </main>
  </QueryClientProvider>
)
