import { useCallback, useEffect, useMemo, useState } from "react"
import { IInfoItem, IJobData, IJobInfo, IMainJOB, ISubJOB } from "../contexts/types/interface"

export interface IUseEditState
{
    mainJob : IMainJobEdit | null,
    setMainJob : (job : IMainJobEdit | null) => boolean,
    subJob : ISubJobEdit | null,
    setSubJob : (job : ISubJobEdit | null) => void,
    title : string, 
    setTitle : (text : string) => void,
    freeText : string,
    setFreeText : (text : string) => void,
    reason : string,
    setReasonText : (text : string) => void,

    jobEditData : IMainJobEdit[],
    setJobEditData : (data : IMainJobEdit[]) => void,

    setReset : () => void,

    onHandleAutoSelect? : () => void,
}

export interface IMainJobEdit extends IMainJOB
{
    subJobs : ISubJobEdit[],
}

export interface ISubJobEdit extends ISubJOB
{
    info : IJobInfoEdit[],
}

export interface IJobInfoEdit extends IJobInfo
{
    checked : boolean,
    items : IInfoItemValue[],
}

export interface IInfoItemValue extends IInfoItem
{
    value : string,
}

const initEditJobData = (baseJobData : IJobData) =>
{
    return baseJobData.jobs.map(m =>
    {
        const ed_mjob : IMainJobEdit = 
        {
            ...m,
            subJobs : m.subJobs.map(s =>
            {
                const ed_sjob : ISubJobEdit = 
                {
                    ...s,
                    info: s.info.map(i => 
                    {
                        const ed_info : IJobInfoEdit = 
                        {
                            ...i,
                            checked : false,
                            items : i.items.map(v =>
                            {
                                const ed_value: IInfoItemValue = 
                                {
                                    ...v,
                                    value : "",
                                }   
                                
                                return ed_value;
                            })
                        }

                        return ed_info;
                    })
                }   

                return ed_sjob;
            })
        };

        return ed_mjob;
    });
}

export const useEditState = (baseJobData? : IJobData) : IUseEditState =>
{
    const [baseIJobData] = useState<IJobData>(baseJobData as IJobData);

    const [mainJob, setMainJobValue] = useState<IMainJobEdit | null>(null);
    const [subJob, setSubJobValue] = useState<ISubJobEdit | null>(null);

    const [title, setTitleValue] = useState<string>("");
    const [reason, setReasonText] = useState<string>("");
    const [freeText, setFreeText] = useState<string>("");

    const [jobEditData, setJobEditData] = useState<IMainJobEdit[]>([]);

    useEffect(() =>
    {
        if (baseJobData != null)
        {
            setJobEditData(initEditJobData(baseIJobData));
        }

    }, []);

    const setReset = () =>
    {
        setMainJob(null);
        setSubJob(null);
        setTitle("");
        setReasonText("");
        setFreeText("");

        setJobEditData(initEditJobData(baseIJobData));
    }

    const setTitle = useCallback((newValue : string) =>
    {
        setTitleValue(newValue);
        
    }, [title]);

    const setMainJob = useCallback((job : IMainJobEdit | null) =>
    {
        setMainJobValue(job);
        setSubJobValue(null);

        if (job != null && job.subJobs.length == 1)
        {
            setSubJob(job.subJobs[0]);
            return true;
        }
        
        return false;

    }, [mainJob]);

    const setSubJob = useCallback((job : ISubJobEdit | null) =>
    {
        setSubJobValue(job);

    }, [subJob]);

    useEffect(() =>
    {
        console.log("TEST1");
    }, [freeText]);

    return {
        mainJob,
        setMainJob,
        subJob,
        setSubJob,
        title,
        setTitle,
        reason,
        setReasonText,
        freeText,
        setFreeText,

        jobEditData,
        setJobEditData,

        setReset
    }
}