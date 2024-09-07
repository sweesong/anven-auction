'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// HOC to protect pages
const withAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (status === 'unauthenticated') {
        router.replace('/0191ba6b-7443-75f3-8c5c-da766df93c5e'); // Change this to your login page route
      }
    }, [status, router]);

    // While session is loading, you can show a loading spinner
    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    // If authenticated, render the protected page
    if (session) {
      return <WrappedComponent {...props} />;
    }

    // Optionally render nothing if unauthenticated while redirecting
    return null;
  };
};

export default withAuth;
