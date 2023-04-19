import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSave: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload )
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSave = ''
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSave = ''
        },
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id ) {
                    return action.payload
                }
                return note
            })

            state.messageSave = `Nota actualizada correctamente.`
        },
        deleteNote: (state, action) => {
            
        }
    },
})

export const { 
    addNewEmptyNote,
    deleteNote,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions