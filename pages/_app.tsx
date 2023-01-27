import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/protectedRoute';
import Dashboard from './dashboard';
import { QueryClient, QueryClientProvider, useQuery, Hydrate } from '@tanstack/react-query'
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {



  const [queryClient] = useState(() => new QueryClient());

   

  const router = useRouter();
  const noAuthRequired = ['/'];


  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthContextProvider>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Dashboard>
                <Component {...pageProps} />
              </Dashboard>
            </ProtectedRoute>
          )}

        </AuthContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp
