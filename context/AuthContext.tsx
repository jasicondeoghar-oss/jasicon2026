
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
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { User } from '../types';
import { ADMIN_EMAILS } from '../constants';
import { saveRegistration, getLatestRegistrationSubmission, createUserProfile } from '../services/db';

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
                    displayName: firebaseUser.displayName || '',
                    role: ADMIN_EMAILS.includes(firebaseUser.email || '') ? 'admin' : 'user',
                    registrationStatus: 'none'
                };

                try {
                    // Check if user has a registration document
                    const docRef = doc(db, 'registrations', firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        
                        // If Auth displayName is missing, try to get it from registrations
                        if (!appUser.displayName && data.fullName) {
                            appUser.displayName = data.fullName;
                        }

                        if (data.registrationStatus === 'completed' || data.registrationStatus === 'pending' || data.registrationStatus === 'approved' || data.registrationStatus === 'rejected') {
                            appUser = {
                                ...appUser,
                                registrationStatus: data.registrationStatus as any,
                                regDetails: data as any
                            };
                        }
                    }

                    // Also check for latest submission in the new collection
                    if (appUser.registrationStatus === 'none') {
                        const latestSub = await getLatestRegistrationSubmission(firebaseUser.uid) as any;
                        if (latestSub) {
                            appUser = {
                                ...appUser,
                                registrationStatus: latestSub.registrationStatus as any,
                                regDetails: latestSub as any
                            };
                        }
                    }
                    
                    // Also fetch from 'users' collection for the core profile name
                    const userProfileRef = doc(db, 'users', firebaseUser.uid);
                    const userProfileSnap = await getDoc(userProfileRef);
                    if (userProfileSnap.exists()) {
                        const profileData = userProfileSnap.data();
                        if (!appUser.displayName && profileData.displayName) {
                            appUser.displayName = profileData.displayName;
                        }
                        if (profileData.role) {
                            appUser.role = profileData.role as any;
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
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = async () => {
        setLoading(true);
        const userCredential = await signInWithPopup(auth, googleProvider);
        if (userCredential.user) {
            await createUserProfile(userCredential.user.uid, {
                email: userCredential.user.email || '',
                displayName: userCredential.user.displayName || 'User'
            });
        }
    };


    const signup = async (email: string, password: string, name: string) => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: name
        });
        
        // Create user profile in Firestore
        await createUserProfile(userCredential.user.uid, {
            email: email,
            displayName: name
        });
    };


    const logout = async () => {
        await signOut(auth);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    const completeRegistration = async (data: any) => {
        if (!user) {
            console.error("completeRegistration: No user found in state");
            return;
        }
        try {
            const registrationData = {
                ...data,
                email: data.email || user.email || ''
            };
            await saveRegistration(user.uid, registrationData);
            
            // Update local state to pending with full details
            setUser(prev => prev ? ({
                ...prev,
                registrationStatus: 'pending' as any,
                regDetails: {
                    ...registrationData,
                    registrationStatus: 'pending'
                }
            }) : null);
        } catch (error: any) {
            console.error("Failed to complete registration flow:", error);
            // Provide more info in the error message if possible
            const errorMsg = error.message || "Unknown Firestore error";
            throw new Error(`Submission failed: ${errorMsg}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F14] text-[#C9A24D]">
                <div className="w-16 h-16 border-4 border-[#C9A24D] border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-xl font-medium serif animate-pulse">Initializing Jasicon 2026...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, googleLogin, signup, logout, resetPassword, completeRegistration }}>
            {children}
        </AuthContext.Provider>
    );
};
