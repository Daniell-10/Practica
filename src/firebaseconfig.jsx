import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase (copia la configuración de tu proyecto de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyCw6doRkPwxu5wIIWTRyVW4deX90NgiOMI",
    authDomain: "practica1-c142b.firebaseapp.com",
    projectId: "practica1-c142b",
    storageBucket: "practica1-c142b.firebasestorage.app",
    messagingSenderId: "723004553563",
    appId: "1:723004553563:web:78471410f4d01d549b027e"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Obtenemos la referencia a Firestore
const db = getFirestore(app);

export { db };
