import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';

export const AppToolBar = () =>
{
    return  (
        <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ textAlign: "left", flexGrow: 1 }}>
            SSTool
          </Typography>
          <IconButton  size="large" color="inherit">
            <SettingsIcon></SettingsIcon>
          </IconButton>
        </Toolbar>
        </AppBar>
    )
}