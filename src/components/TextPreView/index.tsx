import styled from "@emotion/styled";

interface ITextPreViewProps
{
    children : React.ReactNode,
}

const PreView = styled("pre")((theme) =>
(
    {
        textAlign: "left",
        fontFamily: "inherit",
        overflowWrap: "anywhere",
        whiteSpace: "pre-wrap"
    }
));

export const TextPreView = (prop : ITextPreViewProps) =>
{
    return <PreView>{prop.children}</PreView>
}