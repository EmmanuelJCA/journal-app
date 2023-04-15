import { TurnedInNot } from '@mui/icons-material'
import { Avatar, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'

export const SideBar = ({ drawerWidth }) => {

    const { displayName, photoURL } = useSelector( state => state.auth )

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
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
                            <ListItem key={ text } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={ text } />
                                        <ListItemText primary={ 'Ut est Lorem nisi ea.' } />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>
            
        </Box>
    )
}
