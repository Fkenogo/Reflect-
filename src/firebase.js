// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Paste your firebaseConfig object here
const firebaseConfig = {
  apiKey: "AIzaSyACkHjwKEGN1DfVJApkyizwHSnti4WBBt5Y",
  authDomain: "reflect-5672a.firebaseapp.com",
  projectId: "reflect-5672a",
  storageBucket: "reflect-5672a.firebasestorage.app",
  messagingSenderId: "229131380724",
  appId: "1:229131380724:web:dbba0f4a7c68f0f5177ba1",
  measurementId: "G-70G3CNMHQ4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

cd REFLECT

git add src/firebase.js
git commit -m "Add Firebase configuration"
pwd

/home/user/REFLECT
ls

src  public  package.json  package-lock.json
npm install firebase

npm install firebase
npm WARN REFLECT@1.0.0 No description

npm WARN REFLECT@1.0.0 No repository field.

added 2 packages from 1 contributor and audited 50 packages in 2.345s

found 0 vulnerabilities
npm list firebase
REFLECT@1.0.0 /home/user/REFLECT
└── firebase@9.22.1
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACkHjwKEGN1DfVJApkyizwHSnti4WBBt5Y",
  authDomain: "reflect-5672a.firebaseapp.com",
  projectId: "reflect-5672a",
  storageBucket: "reflect-5672a.firebasestorage.app",
  messagingSenderId: "229131380724",
  appId: "1:229131380724:web:dbba0f4a7c68f0f5177ba1",
  measurementId: "G-70G3CNMHQ4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

