import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material"
import { IJobData, IMainJOB } from "../../../contexts/types/interface";
import { IUseEditState } from "../../../hooks";
import { FieldLabel } from "../FieldLabel"

export interface IFieldJobSelecterProps
{
    labelText: string,
    defaultValue?: string,

    mainJobList : IMainJOB[],
    editStateHook : IUseEditState,
}

export const FieldJobTypeSelecter = (props : IFieldJobSelecterProps) =>
{
    const getMainJob = () =>
    {
        if (props.editStateHook.mainJob == null) return null;
        return props.editStateHook.mainJob.name;
    }

    const getSubJob = () =>
    {
        if (props.editStateHook.subJob == null) return null;
        return props.editStateHook.subJob.name;
    }

    return (
            <Stack spacing={2} sx={{ width: "100%" }}>
                <FieldLabel text={ props.labelText }></FieldLabel>

                <FormControl>
                    <InputLabel sx={{ textAlign: "left" }} id="select-helper-mainJob">メイン</InputLabel>
                    <Select sx={{ textAlign: "left" }} label="メイン" value={ getMainJob() } labelId="select-helper-mainJob">
                        {
                            props.mainJobList.map(job =>
                            {
                                return (<MenuItem value={job.name} onClick={ () => props.editStateHook.setMainJob(job) }>{ job.name }</MenuItem>);
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
        )
}