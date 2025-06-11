// 'use client';
// // src/components/PublicRoute.tsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// // This component prevents authenticated users from accessing login/register pages
// const PublicRoute: React.FC = () => {
//   const { isAuthenticated, loading } = useAuth();
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   // If already authenticated, redirect to dashboard
//   if (isAuthenticated()) {
//     return <Navigate to="/dashboard" replace />;
//   }
  
//   // If not authenticated, render the child routes (login/register)
//   return <Outlet />;
// };

// export default PublicRoute;