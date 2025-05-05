'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import Cookies from 'js-cookie' 
import { useRouter } from 'next/navigation'

type AuthContextType = {
    // signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: { children: React.ReactNode }) {
    // const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Initialize auth from cookies
        const initializeAuth = async () => {
            try {
                const userCookie = Cookies.get('token') // Read user data from cookie
                if (userCookie) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verifyToken`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userCookie}`,
                        },
                    });

                    if (!response.ok) {
                        Cookies.remove('token'); 
                        Cookies.remove('is_profile_complete'); 
                        router.push('/signin'); // Redirect to sign-in page
                        return
                    }
                } else {
                    router.push('/signin') // Redirect to sign-in page if no token
                }
            } catch (error) {
                console.error('Error initializing auth:', error)
                router.push('/signin') // Redirect to sign-in page on error
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()
    }, [router])

    // const signInWithGoogle = async () => {
    //     try {
    //         Cookies.set('user', JSON.stringify(fakeUser), {secure: true, sameSite: 'strict'})
    //         setUser(fakeUser)
    //     } catch (error) {
    //         console.error('Error signing in with Google:', error)
    //     }
    // }

    const signOut = async () => {
        try {
            Cookies.remove('token')
            Cookies.remove('is_profile_complete')
            // setUser(null)
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <AuthContext.Provider value={{signOut, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}