import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { SnackBarState } from "../contexts/types/interface";

export const contextSnackBarState = createContext<SnackBarState>(
    {
        isOpen: false,
        message : "",
    }
);

export const setSnackBarStateContext = createContext<Dispatch<SetStateAction<SnackBarState>>>(
    () => null
);

interface IProviderSnackBarContext
{
    children : React.ReactNode,
}

export const ProviderSnackBarContext = (props : IProviderSnackBarContext) =>
{
    const [snackbarstate, setSnackbarState] = useState<SnackBarState>(
        {
            isOpen : false,
            message: "",
        }
    );

    return (
        <contextSnackBarState.Provider value={snackbarstate}>
            <setSnackBarStateContext.Provider value={setSnackbarState}>
                {props.children}
            </setSnackBarStateContext.Provider>
        </contextSnackBarState.Provider>
    )
}