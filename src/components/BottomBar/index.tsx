import { AppBar, Toolbar, IconButton, Typography, Button, styled } from "@mui/material"
import { IJobData } from "../../contexts/types/interface";
import { IUseEditState } from "../../hooks";

const ButtonEx = styled(Button)( (theme) => 
(
    {
        padding: "8px 64px 8px 64px",
        // backgroundColor: "red",
    }
));

interface IBottomBarProps
{
    jobData : IJobData,
    editStateHook : IUseEditState,
}

export const BottomBar = (props : IBottomBarProps) =>
{
    const clear = () =>
    {
        props.editStateHook.setReset();
    }

    return (
        <AppBar sx={{ bottom: 0, backgroundColor: "white", }} position="sticky">
            <Toolbar>
                <ButtonEx variant="contained">出力</ButtonEx>
                <Typography sx={{ flexGrow: 1 }} ></Typography>
                <Button color="error" variant="contained" onClick={clear}>クリア</Button>
            </Toolbar>
        </AppBar>
    )
}
