import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Make sure this import is correct for your Next.js version

const withAuth = (WrappedComponent) => {
  const Component = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const router = useRouter(); // Using router from next/navigation

    useEffect(() => {
      setIsComponentMounted(true); // Set when the component is mounted

      // Check the token only on the client-side
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (token) {
        setIsAuthenticated(true);
      } else if (isComponentMounted) {
        // Redirect the user only when the component is mounted
        router.push("/login");
      }
    }, [router, isComponentMounted]); // Use router in the dependency array

    if (!isAuthenticated && isComponentMounted) {
      // Return null or a loading indicator when checking the authentication status
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
