
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { User } from '../types';
import { ADMIN_EMAILS } from '../constants';
import { saveRegistration } from '../services/db';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    completeRegistration: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Map Firebase user to our app's User type
                let appUser: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || 'User',
                    role: ADMIN_EMAILS.includes(firebaseUser.email || '') ? 'admin' : 'user',
                    registrationStatus: 'none'
                };

                try {
                    // Check if user has a registration document
                    const docRef = doc(db, 'registrations', firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.registrationStatus === 'completed') {
                            appUser = {
                                ...appUser,
                                registrationStatus: 'completed',
                                regDetails: data as any
                            };
                        }
                    }
                } catch (error) {
                    console.error("Error fetching registration status:", error);
                }

                setUser(appUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const signup = async (email: string, password: string, name: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // Force update local state if needed, but onAuthStateChanged usually handles it
    };

    const logout = async () => {
        await signOut(auth);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    const completeRegistration = async (data: any) => {
        if (!user) return;
        try {
            // Ensure email is included, falling back to auth user email if not in data
            const registrationData = {
                ...data,
                email: data.email || user.email || ''
            };
            await saveRegistration(user.uid, registrationData);
            // Update local state
            setUser(prev => prev ? ({
                ...prev,
                registrationStatus: 'completed',
                regDetails: data
            }) : null);
        } catch (error) {
            console.error("Failed to complete registration", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, googleLogin, signup, logout, resetPassword, completeRegistration }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
