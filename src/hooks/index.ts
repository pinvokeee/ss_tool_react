import { useCallback, useEffect, useState } from "react"
import { IJobData, IMainJOB, ISubJOB } from "../contexts/types/interface"

export interface IUseEditState
{
    mainJob : IMainJOB | null,
    setMainJob : (job : IMainJOB | null) => void,
    subJob : ISubJOB | null,
    setSubJob : (job : ISubJOB | null) => void,
    title : string, 
    setTitle : (text : string) => void,
    freeText : string,
    setFreeText : (text : string) => void,
    reason : string,
    setReasonText : (text : string) => void,

    setReset : () => void,
}

export const useEditState = () : IUseEditState =>
{
    const [mainJob, setMainJobValue] = useState<IMainJOB | null>(null);
    const [subJob, setSubJobValue] = useState<ISubJOB | null>(null);

    const [title, setTitle] = useState<string>("");
    const [reason, setReasonText] = useState<string>("");
    const [freeText, setFreeText] = useState<string>("");

    const name = mainJob?.name;

    const aaa : any = [];

    const setReset = () =>
    {
        setMainJob(null);
        setSubJob(null);
        setTitle("");
        setReasonText("");
        setFreeText("");
    }

    const setMainJob = useCallback((job : IMainJOB | null) =>
    {
        setMainJobValue(job);
        setSubJobValue(null);

        if (job != null)
        {
            // aaa[job] = "test";
        }

        console.log(mainJob, subJob);

    }, [mainJob]);

    const setSubJob = useCallback((job : ISubJOB | null) =>
    {
        setSubJobValue(job);
    }, [subJob]);

    // useEffect(() =>
    // {
    //     setSubJob(null);
    //     console.log({mainJob, subJob});

    //     console.log(name);

    // }, [mainJob]);


    // useEffect(() =>
    // {
    //     // setSubJob(null);
    //     console.log(subJob);

    // }, [subJob]);


    useEffect(() =>
    {
        console.log({ title, freeText, reason });
    }, [title, reason, freeText]);

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

        setReset
    }
}