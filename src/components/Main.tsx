import React from 'react'
import { Content } from './Content'
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/query-client';

export const Main = () => (
  <main>
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  </main>
)
