import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { startLoginUser, startGoogleSignIn } from '../../store/auth'

const formValidations = {
    email: [ (value) => value.includes('@'), 'Correo no valido.' ],
    password: [ (value) => value.length >= 6, 'La contraseña debe tener mas de 6 letras.' ],
}

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status } = useSelector( state => state.auth )

    const dispatch = useDispatch()
    const [formSubmitted, setformSubmitted] = useState(false)

    const { 
        email, emailValid, 
        password, passwordValid,
        formState, onInputChange, isFormValid, 
    } = useForm( formData, formValidations )

    const isAuthenticating = useMemo( () => status === 'checking', [status] )

    const onSubmit = ( event ) => {
        event.preventDefault()
        setformSubmitted(true)

        if( !isFormValid ) return

        dispatch( startLoginUser(formState) )
    }

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() )
    }

    return (
        <AuthLayout title='Inicio de Sesion'>
            <form onSubmit={ onSubmit }>
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo" 
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ formSubmitted && emailValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ formSubmitted && passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled={ isAuthenticating }
                                type="submit" 
                                variant='contained' 
                                fullWidth
                            >
                                Iniciar Sesion
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled={ isAuthenticating }
                                variant='contained' 
                                fullWidth
                                onClick={ onGoogleSignIn }
                            >
                                <Google />
                                <Typography sx={{ ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1}}>¿No posee una cuenta?</Typography>
                        <Link component={ RouterLink } color='inherit' to="/auth/register">
                            Registrarse
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}