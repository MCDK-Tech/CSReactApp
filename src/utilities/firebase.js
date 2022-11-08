import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator, onValue, ref, update } from 'firebase/database';
import { connectAuthEmulator, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBuyjXv2X8Ba6MavVn-VqLM6yjFV1SKxLo",
  authDomain: "react-app-c6dbc.firebaseapp.com",
  databaseURL: "https://react-app-c6dbc-default-rtdb.firebaseio.com",
  projectId: "react-app-c6dbc",
  storageBucket: "react-app-c6dbc.appspot.com",
  messagingSenderId: "421235700304",
  appId: "1:421235700304:web:e6724da347046af4865755"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV.REACT_APP_EMULATE) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(db, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};