import { Box, Button, Snackbar, Stack, styled } from "@mui/material";
import { randomInt } from "crypto";
import { ReactNode, useContext, useState } from "react";
import { contextIJobData } from "../../contexts/contexts";
import { IFieldConfig, IFieldSetting, IJobData, IMainJOB } from "../../contexts/types/interface";
import { IUseEditState, useEditState } from "../../hooks";
import { contextSnackBarState, setSnackBarStateContext } from "../../Provider/ProviderSnackBarContext";
import { createConfig } from "../../util/fieldConfig";
import { generateUuid } from "../../util/util";
import { FieldBase, InfoInputField, MultiLineTextField, ReadOnlyField } from "../dataInputField/Base";
import { FieldJobTypeSelecter } from "../dataInputField/jobTypeSelecter";
import { WorkedTimeLine } from "../WorkedTimeLine";

const createDataField = ( fieldSetting : IFieldSetting, context : IJobData, editStateHook : IUseEditState ) =>
{
    if (fieldSetting.type == "text") return <FieldBase key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} onGetValue={ fieldSetting.getter } onHandle={ fieldSetting.setter }></FieldBase>;
    if (fieldSetting.type == "multiLineText") return <MultiLineTextField key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} onGetValue={ fieldSetting.getter } onHandle={ fieldSetting.setter }></MultiLineTextField>;
    if (fieldSetting.type == "readonly") return <ReadOnlyField key={fieldSetting.no} labelText={`${fieldSetting.caption}`} onGetValue={ fieldSetting.getter }></ReadOnlyField>;
    if (fieldSetting.type == "jobSelecter") return <FieldJobTypeSelecter key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} mainJobList={editStateHook.jobEditData} editStateHook={editStateHook} ></FieldJobTypeSelecter>;
    if (fieldSetting.type == "infoList") return <InfoInputField key={fieldSetting.no} labelText={`${fieldSetting.no}.${fieldSetting.caption}`} editStateHook={editStateHook}></InfoInputField>
    return <></>
}

interface IWorkedContainerProps 
{
    jobData : IJobData,
    editStateHook : IUseEditState,

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
    const fieldData = createConfig(props.jobData, props.editStateHook);

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
            <WorkedTimeLine fieldConfig={fieldData} editStateHook={props.editStateHook}></WorkedTimeLine>
            <Stack spacing={4} sx={ { overflowY: "auto", padding: "22px" } }>
                {
                    fieldData.blocks.map((block, i) => 
                    {
                        return (
                        <Stack direction="row" spacing={2}>
                        {
                            block.items.map((item) => 
                            {
                                return (
                                    createDataField(item, props.jobData, props.editStateHook)
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