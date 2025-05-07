'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
    const { signOut } = useAuth(); // Access the signOut function from AuthContext

    const handleLogout = async () => {
        try {
            await signOut(); // Call the signOut function
            // console.log('User logged out successfully');
        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
            Logout
        </button>
    );
}