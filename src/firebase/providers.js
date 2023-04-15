import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "@firebase/auth"
import { FirebaseAuth } from "./config"

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async() => {
    try {

        const resp = await signInWithPopup( FirebaseAuth, googleProvider )
        const { uid, email, displayName, photoURL } = resp.user

        return {
            ok: true,
            uid, email, displayName, photoURL
        }  

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const registerUser = async({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = resp.user

        await updateProfile( FirebaseAuth.currentUser, { displayName } )

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const loginUser = async({ email, password }) => {
    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL, displayName } = resp.user

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutUser = async() => {
    return await FirebaseAuth.signOut()
}