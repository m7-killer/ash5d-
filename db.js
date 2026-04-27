import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, onSnapshot, increment, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==========================================
// 🔥 FIREBASE DATABASE CONFIGURATION 🔥
// 1. Go to https://console.firebase.google.com/
// 2. Create a free project
// 3. Add a "Web App" to get your config
// 4. Create a "Firestore Database" (Start in Test Mode)
// 5. Paste your keys below:
// ==========================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db = null;
let isDbActive = false;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        isDbActive = true;
        console.log("Firebase Database Connected Successfully!");
    } else {
        console.warn("Database not configured. Waiting for Firebase keys...");
    }
} catch (error) {
    console.error("Firebase Initialization Error:", error);
}

// --- DATABASE FUNCTIONS ---

// 1. Save a new Commission Request
export async function saveCommissionToDB(username, options, price) {
    if (!isDbActive) return null;
    try {
        const docRef = await addDoc(collection(db, "commissions"), {
            username: username,
            options: options,
            price: price,
            status: "Pending",
            createdAt: new Date().toISOString()
        });
        
        // Update total earnings potential
        const statsRef = doc(db, "stats", "overview");
        await setDoc(statsRef, {
            totalEarnings: increment(price)
        }, { merge: true });

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}

// 2. Record a Visitor
export async function recordVisitor() {
    if (!isDbActive) return;
    try {
        // Simple check so we don't count the same person refreshing
        if (!sessionStorage.getItem('visited_ash5d')) {
            const statsRef = doc(db, "stats", "overview");
            await setDoc(statsRef, {
                totalVisitors: increment(1)
            }, { merge: true });
            sessionStorage.setItem('visited_ash5d', 'true');
        }
    } catch (e) {
        console.error("Error recording visitor: ", e);
    }
}

// 3. Fetch Admin Stats (Returns a promise)
export async function fetchAdminStats() {
    if (!isDbActive) return { visitors: 0, earnings: 0, dbActive: false };
    try {
        const statsRef = doc(db, "stats", "overview");
        const docSnap = await getDoc(statsRef);
        if (docSnap.exists()) {
            return {
                visitors: docSnap.data().totalVisitors || 0,
                earnings: docSnap.data().totalEarnings || 0,
                dbActive: true
            };
        }
    } catch (e) {
        console.error("Error fetching stats:", e);
    }
    return { visitors: 0, earnings: 0, dbActive: true };
}

// 4. Listen to Live Commissions for Admin Dashboard
export function listenToCommissions(callback) {
    if (!isDbActive) return null;
    try {
        return onSnapshot(collection(db, "commissions"), (querySnapshot) => {
            const commissions = [];
            querySnapshot.forEach((doc) => {
                commissions.push({ id: doc.id, ...doc.data() });
            });
            // Sort by newest first
            commissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            callback(commissions);
        });
    } catch (e) {
        console.error("Error listening to commissions:", e);
        return null;
    }
}

// 5. Save a Chat Message
export async function sendChatMessage(userId, username, text, isAdmin = false) {
    if (!isDbActive) return null;
    try {
        const docRef = await addDoc(collection(db, `chats/${userId}/messages`), {
            username: username,
            text: text,
            isAdmin: isAdmin,
            timestamp: new Date().toISOString()
        });
        
        // Update user meta info so we have a list of active chats
        await setDoc(doc(db, "chats", userId), {
            lastUsername: username,
            lastUpdated: new Date().toISOString()
        }, { merge: true });

        return docRef.id;
    } catch (e) {
        console.error("Error sending chat:", e);
        return null;
    }
}

// 6. Listen to a Specific User's Chat (for customer & admin)
export function listenToUserChat(userId, callback) {
    if (!isDbActive) return null;
    try {
        return onSnapshot(collection(db, `chats/${userId}/messages`), (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            // Sort by oldest first
            messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            callback(messages);
        });
    } catch (e) {
        console.error("Error listening to chat:", e);
        return null;
    }
}

// 7. Listen to all active chats (for Admin sidebar)
export function listenToAllActiveChats(callback) {
    if (!isDbActive) return null;
    try {
        return onSnapshot(collection(db, "chats"), (querySnapshot) => {
            const chats = [];
            querySnapshot.forEach((doc) => {
                chats.push({ id: doc.id, ...doc.data() });
            });
            // Sort by most recently updated
            chats.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            callback(chats);
        });
    } catch (e) {
        console.error("Error listening to all chats:", e);
        return null;
    }
}

// 8. Manage Global Commission Config
export async function saveCommissionConfig(config) {
    if (!isDbActive) return null;
    try {
        const configRef = doc(db, "stats", "gallery_config");
        await setDoc(configRef, config, { merge: true });
        return true;
    } catch (e) {
        console.error("Error saving config:", e);
        return false;
    }
}

export async function loadCommissionConfig() {
    if (!isDbActive) return null;
    try {
        const configRef = doc(db, "stats", "gallery_config");
        const docSnap = await getDoc(configRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (e) {
        console.error("Error loading config:", e);
    }
    return null;
}

export function listenToConfig(callback) {
    if (!isDbActive) return null;
    try {
        return onSnapshot(doc(db, "stats", "gallery_config"), (docSnap) => {
            if (docSnap.exists()) {
                callback(docSnap.data());
            }
        });
    } catch (e) {
        console.error("Error listening to config:", e);
        return null;
    }
}

export { isDbActive };
