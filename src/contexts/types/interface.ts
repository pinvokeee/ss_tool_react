export interface IJobData
{
    jobs : IMainJOB[],
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
    blocks: IFieldBlock[],
}

export interface IFieldBlock
{
    items: IFieldSetting[],
}

export interface IFieldSetting
{
    no: number,
    caption: string,
    type: "text" | "multiLineText" | "jobSelecter" | "infoList" | "readonly",
    valueType : "string" | "jobData",

    onGetValue?: () => any,
    onChange?: (newValue : any) => void,

    onHandleMenu?: () => any,


    // onGetObject?: () => any,
    // onChangeObject?: (newValue : Object) => any,
}

export interface InputValues
{
    
}