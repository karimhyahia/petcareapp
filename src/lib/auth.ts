import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { auth } from './firebase';

export async function signUp(email: string, password: string, name: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await sendEmailVerification(user);
    return user;
  } catch (error: any) {
    throw formatAuthError(error);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    throw formatAuthError(error);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw formatAuthError(error);
  }
}

export async function resendVerificationEmail(user: User) {
  try {
    await sendEmailVerification(user);
  } catch (error: any) {
    throw formatAuthError(error);
  }
}

function formatAuthError(error: any) {
  const errorCode = error.code || 'auth/unknown';
  let message = 'Ein unbekannter Fehler ist aufgetreten';

  switch (errorCode) {
    case 'auth/email-already-in-use':
      message = 'Diese E-Mail-Adresse wird bereits verwendet';
      break;
    case 'auth/invalid-email':
      message = 'Ungültige E-Mail-Adresse';
      break;
    case 'auth/operation-not-allowed':
      message = 'E-Mail/Passwort-Anmeldung ist nicht aktiviert';
      break;
    case 'auth/weak-password':
      message = 'Das Passwort ist zu schwach';
      break;
    case 'auth/user-disabled':
      message = 'Dieser Account wurde deaktiviert';
      break;
    case 'auth/user-not-found':
      message = 'Kein Account mit dieser E-Mail-Adresse gefunden';
      break;
    case 'auth/wrong-password':
      message = 'Falsches Passwort';
      break;
    case 'auth/too-many-requests':
      message = 'Zu viele Versuche. Bitte versuchen Sie es später erneut';
      break;
  }

  return { code: errorCode, message };
}