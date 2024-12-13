import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { status } = useSession(); 
    const router = useRouter();
    const [isClient, setIsClient] = useState(false); // Track client-side rendering

    // Ensure the logic only runs on the client
    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient && status === "unauthenticated") {
        router.push('/'); // Redirect if unauthenticated
      }
    }, [status, router, isClient]);

    // Avoid rendering anything on the server
    if (!isClient) {
      return null;
    }

    // Handle loading state
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    // Prevent unauthenticated users from rendering
    if (status === "unauthenticated") {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
