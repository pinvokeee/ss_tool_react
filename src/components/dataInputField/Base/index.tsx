import { CheckBox } from "@mui/icons-material"
import { Box, Card, CardContent, Checkbox, FormControlLabel, Paper, Stack, styled, TextField, Typography } from "@mui/material"
import { IUseEditState } from "../../../hooks"
import { FieldLabel } from "../FieldLabel"

export interface IFieldProps 
{
    labelText: string,
    defaultValue?: string,

    onGetValue? : () => string,
    onHandle? : (newValue : string) => void,
}

export const FieldBase = (props : IFieldProps) =>
{
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <FieldLabel text={ props.labelText }></FieldLabel>
            
            <TextField 
                sx={{ width: "100%" }} 
                value = {  props.onGetValue?.call(this) }
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => props.onHandle?.call(this, event.target.value) }>
            </TextField>

        </Stack>
    )
}

export const MultiLineTextField = (props : IFieldProps) =>
{
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <FieldLabel text={ props.labelText }></FieldLabel>
            <TextField
            sx={{ width: "100%" }}
            label={ props.labelText }
            placeholder="Enterで改行します"
            multiline
            variant="filled"
            value = {  props.onGetValue?.call(this) }
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => props.onHandle?.call(this, event.target.value) }
            ></TextField>
        </Stack>
    )
}

export const ReadOnlyField = (props : IFieldProps) =>
{
    return (
        <Card sx={{ width: "100%" }}>
            <CardContent>
            <Typography sx={{ textAlign: "left", fontSize: "16px", fontWeight: "bold" }} color="text.secondary" gutterBottom>
                { props.labelText }
            </Typography>   
            <PreView>
            { props.onGetValue?.call(this) }                
            </PreView>
            {/* <Typography sx={{ textAlign: "left"}}>
                { props.onGetValue?.call(this) }
            </Typography>                  */}
            </CardContent>

        </Card>
    )
}

const PreView = styled("pre")((theme) =>
(
    {
        textAlign: "left",
        fontFamily: "inherit",
    }
));

interface IInfoInputFieldProps
{
    labelText: string,
    defaultValue?: string,

    editStateHook : IUseEditState,
}

export const InfoInputField = (props : IInfoInputFieldProps) =>
{
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <FieldLabel text={ props.labelText }></FieldLabel>

            {props.editStateHook.subJob?.info.map(item =>
            {
                return (
                    <FormControlLabel control={<Checkbox />} label={item.name} />
                )
            })}
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label={"ada"} /> */}
        </Stack>
    )
}