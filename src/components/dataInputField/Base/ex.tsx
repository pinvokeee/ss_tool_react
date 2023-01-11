import { Card, CardContent, Stack, TextField, Typography } from "@mui/material"
import { useCallback, useReducer, useState } from "react"
import { IFieldProps } from "."
import { IStoreObject, Store } from "../../../hooks/index2"
import { TextPreView } from "../../TextPreView"
import { FieldLabel } from "../FieldLabel"

interface IFieldInputProps
{
    storeObject: Store,

    labelText: string,

    getter?: () => string,
    setter?: (newValue: string) => void,
}

interface IFieldInputState 
{
    value: string,
}

interface IFieldInputAction
{
    action: ""
}

const initState: IFieldInputState = { value: "" }

export const FieldInput = (props: IFieldInputProps) =>
{
    console.log(`${props.labelText}:RENDERED!!`);

    const [value, setValue] = useState("");

    const onChange = useCallback((value: string) => 
    {        
        setValue(value);
        props.setter?.call(this, value);
    },
    []);
    
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <FieldLabel text={ props.labelText }></FieldLabel>
            
            <TextField
                value={ props.getter?.call(this) }
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value) }>
            </TextField>

        </Stack>
    );
}

export const FieldTextArea = (props: IFieldInputProps) =>
{
    console.log(`${props.labelText}:RENDERED!!`);

    const [value, setValue] = useState("");

    const onChange = useCallback((value: string) => 
    {        
        setValue(value);
        props.setter?.call(this, value);
    },
    []);
    
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <FieldLabel text={ props.labelText }></FieldLabel>
            <TextField
            sx={{ width: "100%" }}
            label={ props.labelText }
            placeholder="Enterで改行します"
            multiline
            variant="filled"
            value={ props.getter?.call(this) }
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value) }>
            </TextField>
        </Stack>
    )

}

export const FieldReadOnly = (props : IFieldInputProps) =>
{
    // console.log(`redender: ${props.labelText}`);

    return (
        <Card sx={{ width: "100%" }}>
            <CardContent>
            <Typography sx={{ textAlign: "left", fontSize: "16px", fontWeight: "bold" }} color="text.secondary" gutterBottom>
                { props.labelText }
            </Typography>   
            <TextPreView>
            { props.getter?.call(this) }                
            </TextPreView>
            </CardContent>

        </Card>
    )
}