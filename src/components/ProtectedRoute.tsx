// 'use client';
// // src/components/ProtectedRoute.tsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute: React.FC = () => {
//   const { isAuthenticated, loading } = useAuth();
  
//   // Show loading state while checking authentication
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   // If not authenticated, redirect to login
//   if (!isAuthenticated()) {
//     return <Navigate to="/sign-in" replace />;
//   }
  
//   // If authenticated, render the child routes
//   return <Outlet />;
// };

// export default ProtectedRoute;