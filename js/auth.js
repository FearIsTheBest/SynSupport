// ---------------------------------------------------------------------------
// Firebase Authentication (email/password + Google) for the Synapse site.
//
// Loaded as an ES module on every page:
//     <script type="module" src="js/auth.js"></script>
//
// It does three things:
//   * keeps the navbar in sync with the signed-in state (#authButtons / #userMenu)
//   * wires up the login form (#loginForm) and register form (#registerForm)
//   * degrades gracefully to "demo mode" until firebase-config.js is filled in
// ---------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { firebaseConfig, isConfigured } from "./firebase-config.js";

let auth = null;
if (isConfigured) {
  try {
    auth = getAuth(initializeApp(firebaseConfig));
  } catch (err) {
    console.error("Firebase failed to initialise:", err);
  }
}

// --- helpers ---------------------------------------------------------------

const $ = (sel, root = document) => root.querySelector(sel);

function showMessage(msg, kind) {
  const box = $("#authError");
  if (!box) return;
  box.textContent = msg;
  box.classList.remove("is-hidden", "is-danger", "is-success");
  box.classList.add(kind === "success" ? "is-success" : "is-danger");
}

function showError(msg) {
  showMessage(msg, "danger");
}

function clearError() {
  const box = $("#authError");
  if (box) box.classList.add("is-hidden");
}

// Friendlier text for the common Firebase auth error codes.
function friendly(err) {
  const map = {
    "auth/invalid-email": "That doesn't look like a valid email address.",
    "auth/missing-email": "Please enter your email address.",
    "auth/missing-password": "Please enter a password.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-not-found": "No account found for that email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/popup-closed-by-user": "The sign-in window was closed.",
  };
  return map[err && err.code] || (err && err.message) || "Something went wrong.";
}

function demoNotice() {
  showError(
    "Auth isn't connected yet — add your Firebase keys in js/firebase-config.js to enable sign in."
  );
}

function setLoading(btn, loading) {
  if (!btn) return;
  btn.classList.toggle("is-loading", loading);
  btn.disabled = loading;
}

// --- navbar auth state -----------------------------------------------------

function renderNav(user) {
  const buttons = $("#authButtons");
  const menu = $("#userMenu");
  if (!buttons || !menu) return;

  if (user) {
    buttons.classList.add("is-hidden");
    menu.classList.remove("is-hidden");
    const label = $("#userLabel", menu);
    if (label) label.textContent = user.displayName || user.email || "Account";
  } else {
    buttons.classList.remove("is-hidden");
    menu.classList.add("is-hidden");
  }
}

if (auth) {
  onAuthStateChanged(auth, renderNav);
} else {
  renderNav(null);
}

document.addEventListener("click", (e) => {
  const logout = e.target.closest("#logoutButton");
  if (!logout) return;
  e.preventDefault();
  if (auth) signOut(auth).catch((err) => console.error(err));
});

// --- Google sign-in --------------------------------------------------------

async function googleSignIn(btn) {
  if (!auth) return demoNotice();
  clearError();
  setLoading(btn, true);
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    window.location.href = "index.html";
  } catch (err) {
    showError(friendly(err));
  } finally {
    setLoading(btn, false);
  }
}

document.querySelectorAll("[data-google-signin]").forEach((btn) =>
  btn.addEventListener("click", () => googleSignIn(btn))
);

// --- login form ------------------------------------------------------------

const loginForm = $("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();
    if (!auth) return demoNotice();
    const btn = $("button[type=submit]", loginForm);
    setLoading(btn, true);
    try {
      await signInWithEmailAndPassword(
        auth,
        $("#email", loginForm).value.trim(),
        $("#password", loginForm).value
      );
      window.location.href = "index.html";
    } catch (err) {
      showError(friendly(err));
    } finally {
      setLoading(btn, false);
    }
  });
}

// --- forgot password -------------------------------------------------------

const forgotLink = $("#forgotPassword");
if (forgotLink) {
  forgotLink.addEventListener("click", async (e) => {
    e.preventDefault();
    clearError();
    if (!auth) return demoNotice();
    const email = (($("#email") || {}).value || "").trim();
    if (!email) {
      return showError("Enter your email above, then click “Forgot password?”.");
    }
    forgotLink.classList.add("is-loading");
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage(
        "Password reset link sent to " + email + ". Check your inbox (and spam).",
        "success"
      );
    } catch (err) {
      showError(friendly(err));
    } finally {
      forgotLink.classList.remove("is-loading");
    }
  });
}

// --- register form ---------------------------------------------------------

const registerForm = $("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    const name = ($("#displayName", registerForm) || {}).value?.trim() || "";
    const email = $("#email", registerForm).value.trim();
    const password = $("#password", registerForm).value;
    const confirm = ($("#confirmPassword", registerForm) || {}).value;

    if (confirm !== undefined && password !== confirm) {
      return showError("Passwords do not match.");
    }
    if (!auth) return demoNotice();

    const btn = $("button[type=submit]", registerForm);
    setLoading(btn, true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(user, { displayName: name });
      window.location.href = "index.html";
    } catch (err) {
      showError(friendly(err));
    } finally {
      setLoading(btn, false);
    }
  });
}
