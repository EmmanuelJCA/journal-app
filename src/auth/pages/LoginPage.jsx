import { useDispatch } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/thunks'
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'

export const LoginPage = () => {

    const dispatch = useDispatch()

    const { email, password, onInputChange } = useForm({
        email: 'emmanuelcanate@gmail.com',
        password: '123456'
    })

    const onSubmit = ( event ) => {
        event.preventDefault()
        console.log({ email, password })

        dispatch( checkingAuthentication() )
    }

    const onGoogleSignIn = () => {
        console.log('Google')
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
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                type="submit" 
                                variant='contained' 
                                fullWidth
                            >
                                Iniciar Sesion
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
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
