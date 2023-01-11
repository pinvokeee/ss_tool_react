import { IMainJobEdit } from "../../hooks";

export interface IJobData
{
    jobs : IMainJobEdit[],
}

export interface IMainJOB
{
    name : string,
    subJobs : ISubJOB[],
}

export interface ISubJOB
{
    name : string,
    tips: string,
    info : IJobInfo[],
    key : string,
}

export interface IJobInfo
{
    name : string,
    items: IInfoItem[],
    key : string,
}

export interface IInfoItem
{
    name: string,
    prefix: string,
    suffix: string,
    key : string,
}

export interface IFieldConfig 
{
    blocks: IFieldAreaLine[],
}

export interface IFieldAreaLine
{
    options: IFieldOption[],
}

export interface IFieldOption
{
    no: number,
    caption: string,
    type: "text" | "multiLineText" | "jobSelecter" | "infoList" | "readonly",
    valueType : "string" | "jobData",

    updateTriggerName?: string,

    getUpdateKey?: () => string,

    update?: () => void,
    getter?: () => any,
    setter?: (value: any) => void,
}

export interface SnackBarState
{
    isOpen : boolean,
    message : string,
}