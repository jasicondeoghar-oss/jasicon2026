
import { collection, addDoc, doc, setDoc, serverTimestamp, getDocs, updateDoc, query, where, orderBy, limit, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { RegistrationData, User } from '../types';

// Collection References
const REGISTRATIONS_COLLECTION = 'registrations';
const SUBMISSIONS_COLLECTION = 'registration_submissions';
const CONTACTS_COLLECTION = 'contacts';
const USERS_COLLECTION = 'users';

/**
 * Uploads a payment screenshot to Firebase Storage and returns the download URL.
 */
export const uploadPaymentScreenshot = async (userId: string, file: File) => {
    if (!userId || !file) throw new Error("User ID and file are required for upload");
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const storageRef = ref(storage, `payment_screenshots/${userId}/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};

/**
 * Creates or updates a user profile document in the 'users' collection.
 * This is essential for Firestore security rules that check for user existence.
 */
export const createUserProfile = async (userId: string, data: { email: string; displayName: string; role?: string }) => {
    if (!userId) return;
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        await setDoc(userRef, {
            ...data,
            uid: userId,
            updatedAt: serverTimestamp(),
            lastLogin: serverTimestamp()
        }, { merge: true });
        console.log("User profile created/updated successfully:", userId);
        return true;
    } catch (error) {
        console.error("Error creating user profile:", error);
        // We don't throw here to avoid blocking auth if just profile creation fails, 
        // but in JASICON rules might be strict.
        return false;
    }
};


interface ContactMessage {
    fullName: string;
    email: string;
    message: string;
    submittedAt?: any;
}

/**
 * Saves or updates a user's registration details.
 * Uses setDoc with merge: true to avoid overwriting unrelated fields if any using UID as document ID.
 */
export const saveRegistration = async (userId: string, data: any) => {
    if (!userId) {
        console.error("saveRegistration: userId is missing");
        throw new Error("User ID is required for registration");
    }
    
    try {
        console.log("Preparing registration payload for userId:", userId);
        
        // Ensure user profile exists before submission (safety check)
        const userRef = doc(db, USERS_COLLECTION, userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            console.log("User profile missing during registration, creating now...");
            await setDoc(userRef, {
                uid: userId,
                email: data.email || '',
                displayName: data.fullName || 'User',
                updatedAt: serverTimestamp()
            }, { merge: true });
        }

        // Create payload
        const payload: any = {
            ...data,
            userId,
            submittedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            registrationStatus: 'pending'
        };

        // Handle Payment Screenshot Upload if it's a File
        if (data.paymentScreenshot instanceof File) {
            console.log("Uploading payment screenshot...");
            try {
                const screenshotUrl = await uploadPaymentScreenshot(userId, data.paymentScreenshot);
                payload.paymentScreenshot = screenshotUrl;
                console.log("Screenshot uploaded successfully:", screenshotUrl);
            } catch (uploadErr) {
                console.error("Screenshot upload failed:", uploadErr);
                throw new Error("Failed to upload payment screenshot. Please try again.");
            }
        }

        if (data.email) {
            payload.email = data.email;
        }

        let lastError = null;

        // PRIMARY ATTEMPT: registration_submissions (Standard Collection)
        // This is where we want all new data to go.
        console.log("Attempting save to:", SUBMISSIONS_COLLECTION);
        try {
            const docRef = await addDoc(collection(db, SUBMISSIONS_COLLECTION), payload);
            console.log("Registration saved successfully to submissions! DocID:", docRef.id);
            
            // Sync to legacy registrations collection as well for dashboard fallback
            // This ensures AuthContext.tsx can find it using the older doc(db, 'registrations', uid) pattern
            try {
                const legacyRef = doc(db, REGISTRATIONS_COLLECTION, userId);
                await setDoc(legacyRef, payload, { merge: true });
                console.log("Sync to legacy registrations successful.");
            } catch (syncErr) {
                console.warn("Legacy sync failed (non-critical):", syncErr);
            }

            return true;
        } catch (err: any) {
            console.error("Primary save failed:", err.message);
            lastError = err;
        }

        // FALLBACK: If primary failed, try direct write to registrations/{userId}
        // Some rules might only allow this.
        console.log("Attempting fallback save to:", REGISTRATIONS_COLLECTION);
        try {
            const userRef = doc(db, REGISTRATIONS_COLLECTION, userId);
            await setDoc(userRef, payload, { merge: true });
            console.log("Fallback save successful.");
            return true;
        } catch (err: any) {
            console.error("Fallback save failed:", err.message);
            if (!lastError) lastError = err;
        }

        throw lastError || new Error("Registration submission failed. Please check your connection or contact support.");
    } catch (error: any) {
        console.error("Critical error in saveRegistration:", error);
        throw error;
    }
};


/**
 * Fetches the latest registration submission for a user.
 */
export const getLatestRegistrationSubmission = async (userId: string) => {
    try {
        const q = query(
            collection(db, SUBMISSIONS_COLLECTION),
            where("userId", "==", userId),
            orderBy("submittedAt", "desc"),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching latest submission:", error);
        return null;
    }
};

/**
 * Updates registration status (approve / reject) from admin panel.
 */
export const updateRegistrationStatus = async (regId: string, status: 'approved' | 'rejected') => {
    try {
        // First try it as a submissions doc ID
        const subRef = doc(db, SUBMISSIONS_COLLECTION, regId);
        await updateDoc(subRef, {
            registrationStatus: status,
            updatedAt: serverTimestamp()
        });
        
        // Also update legacy if possible (admin should have permission)
        // fetch the userId first
        const subSnap = await getDoc(subRef);
        if (subSnap.exists()) {
            const userId = subSnap.data().userId;
            const userRef = doc(db, REGISTRATIONS_COLLECTION, userId);
            await setDoc(userRef, {
                registrationStatus: status,
                updatedAt: serverTimestamp()
            }, { merge: true }).catch(() => {});
        }

        return true;
    } catch (error) {
        // Fallback to legacy path if above failed (maybe regId is a userId)
        try {
            const userRef = doc(db, REGISTRATIONS_COLLECTION, regId);
            await updateDoc(userRef, {
                registrationStatus: status,
                updatedAt: serverTimestamp()
            });
            return true;
        } catch (fallbackError) {
            console.error("Error updating registration status:", error);
            throw error;
        }
    }
};

/**
 * Saves a new contact inquiry.
 * Uses addDoc to generate a random ID for each message.
 */
export const saveContactMessage = async (data: ContactMessage) => {
    try {
        // Save to contacts collection for admin history
        const contactRef = await addDoc(collection(db, CONTACTS_COLLECTION), {
            ...data,
            submittedAt: serverTimestamp()
        });

        // Save to mail collection to trigger email extension
        await addDoc(collection(db, 'mail'), {
            to: 'jasicon2026@gmail.com',
            message: {
                subject: `New Direct Inquiry: ${data.fullName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                        <h2 style="color: #C9A24D; border-bottom: 2px solid #C9A24D; padding-bottom: 10px;">New Website Inquiry</h2>
                        <div style="padding: 20px 0;">
                            <p><strong>Name:</strong> ${data.fullName}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
                                <p style="margin-top: 0;"><strong>Message:</strong></p>
                                <p style="white-space: pre-wrap;">${data.message}</p>
                            </div>
                        </div>
                        <p style="font-size: 12px; color: #999; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 15px;">
                            This is an automated notification from JASICON 2026 Website.
                        </p>
                    </div>
                `
            }
        });

        return true;
    } catch (error) {
        console.error("Error saving contact message:", error);
        throw error;
    }
};


/**
 * Fetches all registrations (combining legacy and new submissions).
 */
export const fetchRegistrations = async () => {
    let submissions: any[] = [];
    let legacy: any[] = [];

    // 1. Try fetching from new submissions collection
    try {
        const subSnapshot = await getDocs(collection(db, SUBMISSIONS_COLLECTION));
        submissions = subSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(`Fetched ${submissions.length} new submissions`);
    } catch (error) {
        // If this fails (e.g., rules block), we still want to try legacy
        console.warn("Could not fetch new submissions (check Firestore rules):", error);
    }

    // 2. Try fetching from legacy registrations collection
    try {
        const legacySnapshot = await getDocs(collection(db, REGISTRATIONS_COLLECTION));
        legacy = legacySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() as any }))
            // Filter out those already present in submissions (by userId if exists)
            .filter(l => !submissions.some(s => (s as any).userId === l.id));
        console.log(`Fetched ${legacy.length} legacy registrations`);
    } catch (error) {
        console.warn("Could not fetch legacy registrations:", error);
    }

    return [...submissions, ...legacy];
};

/**
 * Fetches all contact messages.
 */
export const fetchContacts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, CONTACTS_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};
