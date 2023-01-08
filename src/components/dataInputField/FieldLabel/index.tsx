import { Box, styled } from "@mui/material";

const LabelContainer = styled("span")( (theme) =>
(
    {
        backgroundColor: "#e3f2fd",
        display: "flex",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "left",
        boxSizing: "border-box",

        "&::before":
        {
            
            height: "100%",
            backgroundColor: "#90caf9",
            content: '" "',
            width: "6px",
        }
    }
));

const Label = styled("div")( (theme) => 
(
    {
        padding: "4px",
    }
));

export interface FieldLabelProps
{
    text: string,
}

export const FieldLabel = (props : FieldLabelProps) =>
{
    return (
        <LabelContainer>
            <Label>{props.text}</Label>
        </LabelContainer>
    );
}