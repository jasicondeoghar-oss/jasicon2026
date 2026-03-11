
import { db } from '../firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { RegistrationData, User } from '../types';

// Collection References
const REGISTRATIONS_COLLECTION = 'registrations';
const CONTACTS_COLLECTION = 'contacts';
const USERS_COLLECTION = 'users';

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
    try {
        const userRef = doc(db, REGISTRATIONS_COLLECTION, userId);

        // Explicitly construct the payload to ensure email is present
        // If data.email is undefined, it won't be in the object if we just spread
        // But we want to ensure it is saved if it exists in data
        const payload: any = {
            ...data,
            userId,
            updatedAt: serverTimestamp(),
            registrationStatus: 'completed'
        };

        if (data.email) {
            payload.email = data.email;
        }

        await setDoc(userRef, payload, { merge: true });

        // Also update the main user document status if needed
        // const userDoc = doc(db, USERS_COLLECTION, userId);
        // await setDoc(userDoc, { registrationStatus: 'completed' }, { merge: true });

        return true;
    } catch (error) {
        console.error("Error saving registration:", error);
        throw error;
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
 * Fetches all registrations.
 */
export const fetchRegistrations = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, REGISTRATIONS_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching registrations:", error);
        throw error;
    }
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
