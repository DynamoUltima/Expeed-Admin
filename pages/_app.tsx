import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/protectedRoute';
import Dashboard from './dashboard';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const noAuthRequired = ['/'];
  return (
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
  );
}

export default MyApp
