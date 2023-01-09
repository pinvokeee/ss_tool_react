import { FormControl, InputLabel, MenuItem, Select, Snackbar, Stack } from "@mui/material"
import React, { useContext, useState } from "react";
import { IJobData, IMainJOB } from "../../../contexts/types/interface";
import { IMainJobEdit, IUseEditState } from "../../../hooks";
import { contextSnackBarState, setSnackBarStateContext } from "../../../Provider/ProviderSnackBarContext";
import { generateUuid } from "../../../util/util";
import { FieldLabel } from "../FieldLabel"

export interface IFieldJobSelecterProps
{
    labelText: string,
    defaultValue?: string,

    mainJobList : IMainJobEdit[],
    editStateHook : IUseEditState,
}

export const FieldJobTypeSelecter = (props : IFieldJobSelecterProps) =>
{
    // const snackbarState = useContext(contextSnackBarState);
    const setSnackbarState = useContext(setSnackBarStateContext);

    const getMainJob = () =>
    {
        if (props.editStateHook.mainJob == null) return "";
        return props.editStateHook.mainJob.name;
    }

    const getSubJob = () =>
    {
        if (props.editStateHook.subJob == null) return "";
        return props.editStateHook.subJob.name;
    }

    return (
        <React.Fragment>

            <Stack spacing={2} sx={{ width: "100%" }}>
                <FieldLabel text={ props.labelText }></FieldLabel>

                <FormControl>
                    <InputLabel sx={{ textAlign: "left" }} id="select-helper-mainJob">メイン</InputLabel>
                    <Select sx={{ textAlign: "left" }} label="メイン" value={ getMainJob() } labelId="select-helper-mainJob">
                        {
                            props.mainJobList.map(job =>
                            {
                                return (<MenuItem value={job.name} onClick={ () => 
                                {
                                    const autoSelect = props.editStateHook.setMainJob(job);

                                    setSnackbarState({ message: "サブJOBを自動で選択しました", isOpen: autoSelect });
                                }
                                }>{ job.name }</MenuItem>);
                            })
                        }
                    </Select>
                </FormControl>
                
                <FormControl>
                    <InputLabel sx={{ textAlign: "left" }} id="select-helper-subJob">サブ</InputLabel>
                    <Select sx={{ textAlign: "left" }} label="サブ" value={ getSubJob() } labelId="select-helper-subJob">      
                    {
                            props.editStateHook.mainJob?.subJobs.map(job =>
                            {
                                return (<MenuItem value={job.name} onClick={ () => props.editStateHook.setSubJob(job) }>{ job.name }</MenuItem>);
                            })
                    }              
                    </Select>
                </FormControl>
            
            </Stack>            
        </React.Fragment>

        )
}