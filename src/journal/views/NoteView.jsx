import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/'
import { setActiveNote, startSaveNote } from '../../store/journal'

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active: note, messageSave } = useSelector( state => state.journal )

    const { body, title, date, onInputChange, formState } = useForm( note )

    const dateString = useMemo( () => {
        const newDate = new Date( date )

        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState])

    useEffect(() => {
        if( messageSave.length > 0) {
            Swal.fire('Nota actualizada', messageSave, 'success')
        }
    }, [messageSave])

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    return (
        <Grid 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            className='animate__animated animate__fadeIn animate__faster'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item>
                <Button 
                    onClick={ onSaveNote }
                    color='primary'
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1} } />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                />
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Que sucedio el dia hoy?'
                    minRows={ 5 }
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <ImageGallery />

        </Grid>
    )
}
