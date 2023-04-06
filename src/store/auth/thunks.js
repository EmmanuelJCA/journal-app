import { checkingCredentials } from "./authSlice"

export const checkingAuthentication = ( email, passsword ) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    }

}

export const startGoogleSignIn = () => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    }

}