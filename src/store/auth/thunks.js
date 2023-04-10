import { singInWithGoogle, registerUser, loginUSer } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, passsword ) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    }

}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await singInWithGoogle()
        if( !result.ok ) return dispatch( logout(result.errorMessage) )

        dispatch( login(result) )

    }
}

export const startCreateUser = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, errorMessage } = await registerUser({ email, password, displayName })

        if( !ok ) return dispatch( logout({errorMessage}) )

        dispatch( login({ uid, displayName, email, photoURL }) )

    }
}

export const startLoginUser = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, displayName} = await loginUSer({ email, password })

        if( !ok ) return dispatch( logout({errorMessage}) )

        dispatch( login({ uid, displayName, email, photoURL }) )
    }
}