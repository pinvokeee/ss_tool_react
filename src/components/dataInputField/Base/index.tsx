import { CheckBox } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Checkbox, FormControlLabel, InputAdornment, Paper, Stack, styled, TextField, Typography } from "@mui/material"
import { IInfoItemValue, IJobInfoEdit, IMainJobEdit, IUseEditState } from "../../../hooks"
import { TextPreView } from "../../TextPreView"
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
    console.log(`redender: ${props.labelText}`);

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
    console.log(`redender: ${props.labelText}`);

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
    console.log(`redender: ${props.labelText}`);
    {console.log("AAA")}
    return (
        <Card sx={{ width: "100%" }}>
            <CardContent>
            <Typography sx={{ textAlign: "left", fontSize: "16px", fontWeight: "bold" }} color="text.secondary" gutterBottom>
                { props.labelText }
            </Typography>   
            <TextPreView>
            { props.onGetValue?.call(this) }                
            </TextPreView>
            {/* <Typography sx={{ textAlign: "left"}}>
                { props.onGetValue?.call(this) }
            </Typography>                  */}
            </CardContent>

        </Card>
    )
}

interface IInfoInputFieldProps
{
    labelText: string,
    defaultValue?: string,

    editStateHook : IUseEditState,
}

const changeInputChecked = (hook : IUseEditState, target : IJobInfoEdit, newValue : boolean) =>
{
    target.checked = newValue;
    hook.setJobEditData([ ...hook.jobEditData ]);
}

const changeInputValue = (hook : IUseEditState, target : IInfoItemValue, newValue : string) =>
{
    target.value = newValue;
    hook.setJobEditData([ ...hook.jobEditData ]);
}

export const InfoInputField = (props : IInfoInputFieldProps) =>
{
    console.log(`redender: ${props.labelText}`);

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <FieldLabel text={ props.labelText }></FieldLabel>

            {props.editStateHook.subJob?.info.map(item =>
            {
                return (
                    <>
                    <Accordion sx={{ border: "none" }} expanded={item.checked} onChange={(e, ex) => changeInputChecked(props.editStateHook, item, ex) }>
                        <AccordionSummary>
                            <FormControlLabel 
                            sx={{userSelect: "none"}}
                            key={ item.key }
                            control=
                            {
                                <Checkbox 
                                checked={item.checked}
                                value={item.checked} 
                                onChange={ 
                                    (e : React.ChangeEvent<HTMLInputElement>, value : boolean) => changeInputChecked(props.editStateHook, item, value) 
                                }/>
                            } 
                            label={item.name} />
                        </AccordionSummary>

                        <AccordionDetails>
                            <Stack spacing={4}>
                            {
                                item.checked ? item.items.map(infovalue =>
                                {
                                    return (
                                        <>
                                            <TextField 
                                            onChange={ (e) => changeInputValue(props.editStateHook, infovalue, e.target.value) }
                                            value = { infovalue.value } 
                                            disabled={!item.checked}
                                            placeholder={ infovalue.name } 
                                            label ={ infovalue.name } 
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">{infovalue.prefix}</InputAdornment>,
                                                endAdornment: <InputAdornment position="end">{infovalue.suffix}</InputAdornment>,
                                                }}></TextField>
                                        </>
                                    )
                                }) : <></>
                            }
                            </Stack>
                        </AccordionDetails>

                    </Accordion>

                    </>

                )
            })}
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label={"ada"} /> */}
        </Stack>
    )
}