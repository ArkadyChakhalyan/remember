import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebase } from './firebase';

const auth = getAuth(firebase);

export const signUp = (
    email: string,
    password: string
) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error, 'signUp error');
        });
};

export const signIn = (
    email: string,
    password: string
) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error, 'signIn error');
        });
};