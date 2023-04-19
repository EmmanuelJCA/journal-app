import { TurnedInNot } from '@mui/icons-material'
import { Avatar, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SidebarItem } from './'
import { setActiveNote } from '../../store/journal'

export const SideBar = ({ drawerWidth }) => {

    const { displayName, photoURL } = useSelector( state => state.auth )
    const { notes } = useSelector( state => state.journal )

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xd: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Grid
                        container
                        direction='row'
                        gap={1}
                        alignItems='center'
                    >
                        <Avatar 
                            alt={ displayName }
                            src={ photoURL }
                        />
                        <Typography variant='h6' noWrap component='div' >
                            { displayName }
                        </Typography>
                    </Grid>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SidebarItem 
                                key={ note.id } 
                                { ...note } 
                            />
                        ))
                    }
                </List>

            </Drawer>
            
        </Box>
    )
}
