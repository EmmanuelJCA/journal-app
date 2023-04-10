import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { startCreateUser } from '../../store/auth/'

const formData = {
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
}


export const RegisterPage = () => {
    
    const dispatch = useDispatch()
    const [formSubmitted, setformSubmitted] = useState(false)

    const formValidations = {
        email: [ (value) => value.includes('@'), 'El correo debe tener @.' ],
        password: [ (value) => value.length >= 6, 'La contraseña debe tener mas de 6 letras.' ],
        confirmPassword: [ (value) => value === password, 'Las contraseñas deben coincidir.' ],
        displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio.' ]
    }

    const { status, errorMessage } = useSelector( state => state.auth)
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

    const { 
        displayName, displayNameValid,
        email, emailValid, 
        password, passwordValid, 
        confirmPassword, confirmPasswordValid, 
        formState, onInputChange, isFormValid, 
    } = useForm( formData, formValidations )

    const onSubmit = ( event ) => {
        event.preventDefault()
        setformSubmitted(true)

        if( !isFormValid ) return

        dispatch( startCreateUser(formState) )
    }

    return (
        <AuthLayout title='Registro'>
            <form onSubmit={ onSubmit }>
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre Completo" 
                            type="text"
                            placeholder="John Doe"
                            fullWidth
                            name="displayName"
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>

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
                            helperText={ emailValid }
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
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Confirmar Contraseña" 
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="confirmPassword"
                            value={ confirmPassword }
                            onChange={ onInputChange }
                            error={ !!confirmPasswordValid && formSubmitted }
                            helperText={ confirmPasswordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid 
                        item 
                        xs={ 12 }
                        display={ !!errorMessage ? '' : 'none' }
                    >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button 
                                disabled={ isCheckingAuthentication }
                                type="submit"
                                variant='contained' 
                                fullWidth
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1}}>¿Ya posee una cuenta?</Typography>
                        <Link component={ RouterLink } color='inherit' to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>
                    
                </Grid>
            </form>
        </AuthLayout>
    )
}
