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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// true once the placeholders above have been replaced with real values.
export const isConfigured = !Object.values(firebaseConfig).some(
  (v) => typeof v === "string" && v.startsWith("YOUR_")
);
