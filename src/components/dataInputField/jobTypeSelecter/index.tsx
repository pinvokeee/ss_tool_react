import { FormControl, InputLabel, MenuItem, Select, Snackbar, Stack } from "@mui/material"
import React, { useContext, useState } from "react";
import { IJobData, IMainJOB } from "../../../contexts/types/interface";
import { IMainJobEdit, IUseEditState } from "../../../hooks";
import { Store } from "../../../hooks/index2";
import { contextSnackBarState, setSnackBarStateContext } from "../../../Provider/ProviderSnackBarContext";
import { generateUuid } from "../../../util/util";
import { FieldLabel } from "../FieldLabel"

export interface IFieldJobSelecterProps
{
    storeObject: Store,
    labelText: string,
    getter?: () => string,
    setter?: (newValue: string) => void,
}

export const FieldJobTypeSelecter = (props : IFieldJobSelecterProps) =>
{
    // const snackbarState = useContext(contextSnackBarState);
    const setSnackbarState = useContext(setSnackBarStateContext);

    const getMainJob = () =>
    {
        console.log(props.storeObject);
        if (props.storeObject.getSelectedMainJob() == null) return "";
        return props.storeObject.getSelectedMainJob()?.name as string;
    }

    const getSubJob = () =>
    {
        if (props.storeObject.getSelectedSubJob() == null) return "";
        return props.storeObject.getSelectedSubJob()?.name as string;
    }

    return (
        <React.Fragment>

            <Stack spacing={2} sx={{ width: "100%" }}>
                <FieldLabel text={ props.labelText }></FieldLabel>

                <FormControl>
                    <InputLabel sx={{ textAlign: "left" }} id="select-helper-mainJob">メイン</InputLabel>
                    <Select sx={{ textAlign: "left" }} label="メイン" value={ getMainJob() } labelId="select-helper-mainJob">
                        {
                            props.storeObject.getMainJobList().map(job =>
                            {
                                return (<MenuItem value={job.name} onClick={ () => 
                                {
                                    // const autoSelect = props.storeObject.setSelectedMainJob();
                                    props.storeObject.setSelectedMainJob(job);

                                    // setSnackbarState({ message: "サブJOBを自動で選択しました", isOpen: autoSelect });
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
                            props.storeObject.getSelectedMainJob() != null ? props.storeObject.getSelectedMainJob()?.subJobs.map(job =>
                            {
                                return (<MenuItem value={job.name} onClick={ () => props.storeObject.setSelectedSubJob(job) }>{ job.name }</MenuItem>);
                            })
                            : <></>
                    }              
                    </Select>
                </FormControl>
            
            </Stack>            
        </React.Fragment>

        )
}