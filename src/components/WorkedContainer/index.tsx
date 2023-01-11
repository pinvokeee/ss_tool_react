import { Box, Button, Snackbar, Stack, styled } from "@mui/material";
import { randomInt } from "crypto";
import { ReactNode, useContext, useMemo, useState } from "react";
import { Config } from "../../App";
import { contextIJobData } from "../../contexts/contexts";
import { IFieldConfig, IFieldOption, IJobData, IMainJOB } from "../../contexts/types/interface";
import { IUseEditState, useEditState } from "../../hooks";
import { Store } from "../../hooks/index2";
import { contextSnackBarState, setSnackBarStateContext } from "../../Provider/ProviderSnackBarContext";
import { generateUuid } from "../../util/util";
import { FieldBase, InfoInputField, MultiLineTextField, ReadOnlyField } from "../dataInputField/Base";
import { FieldInput, FieldReadOnly, FieldTextArea } from "../dataInputField/Base/ex";

import { FieldJobTypeSelecter } from "../dataInputField/jobTypeSelecter";
import { WorkedTimeLine } from "../WorkedTimeLine";

const createDataField = (fieldSetting : IFieldOption, store: Store) =>
{
    if (fieldSetting.type == "text")
    {
        return <FieldInput 
        labelText={`${fieldSetting.no}.${fieldSetting.caption}`}
        storeObject={store} 
        getter={fieldSetting.getter} 
        setter={fieldSetting.setter} />
    }

    if (fieldSetting.type == "multiLineText") 
    {
        return <FieldTextArea 
        labelText={`${fieldSetting.no}.${fieldSetting.caption}`}
        storeObject={store} 
        getter={fieldSetting.getter} 
        setter={fieldSetting.setter} />;
    }

    if (fieldSetting.type == "readonly")
    {
        return <FieldReadOnly 
        labelText={`${fieldSetting.caption}`}
        storeObject={store} 
        getter={fieldSetting.getter} 
        setter={fieldSetting.setter}/>;
    }

    if (fieldSetting.type == "jobSelecter")
    {
        return <FieldJobTypeSelecter
        storeObject={store} 
        labelText={`${fieldSetting.no}.${fieldSetting.caption}`} />
    }
    
    // if (fieldSetting.type == "text") return <FieldBase key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} onGetValue={ fieldSetting.onGetValue } onHandle={ fieldSetting.onChange }></FieldBase>;


    // if (fieldSetting.type == "jobSelecter") return <FieldJobTypeSelecter key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} mainJobList={editStateHook.jobEditData} editStateHook={editStateHook} ></FieldJobTypeSelecter>;
    // if (fieldSetting.type == "infoList") return <InfoInputField key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} editStateHook={editStateHook}></InfoInputField>
    
    return <></>
}

interface IWorkedContainerProps 
{
    jobData : IJobData,
    editStateHook : IUseEditState,

    store: Store,

    snackBarState? : any,
    snackbarActionMethod? : (state : any) => void,
}

const Container = styled("div")(({ theme }) =>
(
  {    
    display: "grid",
    gridTemplateColumns: "20% minmax(0, 1fr)",
    height: "100%",
    overflow: "auto",
  }
));


export const WorkedContainer = (props : IWorkedContainerProps) =>
{
    const mainJobs = useMemo(() => props.jobData.jobs, [props.jobData.jobs]);

    const snackbarStateContext = useContext(contextSnackBarState);
    const setSnackbarStateContext = useContext(setSnackBarStateContext);
  
    return (
        <>
        <Snackbar
            autoHideDuration={1000}
            anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
            open={ snackbarStateContext.isOpen }
            onClose={ ()=> setSnackbarStateContext({ ...snackbarStateContext, isOpen: false }) }
            message={ snackbarStateContext.message }
        />

        <Container>
            <div></div>
            {/* <WorkedTimeLine fieldConfig={fieldData} editStateHook={props.editStateHook}></WorkedTimeLine> */}
            <Stack spacing={4} sx={ { overflowY: "auto", padding: "22px" } }>
                {
                    Config.blocks.map((block, i) => 
                    {
                        return (
                        <Stack direction="row" spacing={2}>
                        {
                            block.options.map((item) => 
                            {
                                return (
                                    createDataField(item, props.store)
                                );
                            })
                        }
                        </Stack>);
                    })
                }
            </Stack>
        </Container>
        </>
    );
}