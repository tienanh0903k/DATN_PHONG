import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCbn6tEFG4T4WaXmzJ1mSZFwMMCrcB7pCk',
	authDomain: 'playerduo-5c5dd.firebaseapp.com',
	projectId: 'playerduo-5c5dd',
	storageBucket: 'playerduo-5c5dd.appspot.com',
	messagingSenderId: '662281093639',
	appId: '1:662281093639:web:f8c1196832f78b9bc4a0a2',
	measurementId: 'G-0M7Q54R6DD',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
