// ---------------------------------------------------------------------------
// Firebase configuration
// ---------------------------------------------------------------------------
// 1. Create a project at https://console.firebase.google.com
// 2. Add a Web App, then copy its config values below.
// 3. In the console enable Authentication -> Sign-in method -> Email/Password
//    (and Google, if you want the "Continue with Google" button to work).
//
// Until you replace the placeholders, the auth forms stay in "demo" mode and
// show a friendly notice instead of trying to talk to Firebase.
// ---------------------------------------------------------------------------

export const firebaseConfig = {
  apiKey: "AIzaSyD09rWVVnAyNy3yCxsCEOegK7qHwLVc8EA",
  authDomain: "synsupport.firebaseapp.com",
  projectId: "synsupport",
  storageBucket: "synsupport.firebasestorage.app",
  messagingSenderId: "702056396003",
  appId: "1:702056396003:web:8fdafb94d225e84329c1d6",
  measurementId: "G-GZQV1P9G9N"
};

// true once the placeholders above have been replaced with real values.
export const isConfigured = !Object.values(firebaseConfig).some(
  (v) => typeof v === "string" && v.startsWith("YOUR_")
);
