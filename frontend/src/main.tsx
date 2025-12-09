import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error) {
          const isNetworkError =
            error.message.includes('Network Error') ||
            error.message.includes('ERR_CONNECTION_REFUSED') ||
            error.message.includes('NS_ERROR_CONNECTION_REFUSED') ||
            error.message.includes('Failed to fetch');

          if (isNetworkError) {
            return false;
          }
        }

        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename='/showflix'>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
