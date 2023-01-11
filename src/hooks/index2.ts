import { IMainJobEdit, ISubJobEdit } from ".";
import { IJobData } from "../contexts/types/interface";

export interface IStoreObject
{
    title : string,
    freeText : string,
    reason: string,

    selectedMainJob : IMainJobEdit | null,
    selectedSubJob : ISubJobEdit | null,

    valueTree: IMainJobEdit[]    
}

export class Store
{
    private emptyData: string = "";
    private dataObject: IStoreObject = 
    {
        title: "",
        freeText: "",
        reason: "",

        selectedMainJob: null,
        selectedSubJob: null,

        valueTree: []
    };

    constructor()
    {
        this.emptyData = JSON.stringify(this.dataObject);
    }

    getTitle() : string
    {
        return this.dataObject.title;
    }

    setTitle(value: string)
    {
        this.dataObject.title = value;
    }

    getFreeText() : string
    {
        return this.dataObject.freeText;
    }

    setFreeText(value: string)
    {
        this.dataObject.freeText = value;
    }

    getReason() : string
    {
        return this.dataObject.reason;
    }

    setReason(value: string)
    {
        this.dataObject.reason = value;
    }

    getTips() : string
    {
        const tips = this.dataObject.selectedSubJob?.tips;
        return tips ? tips : "";
    }

    getSelectedMainJob() : IMainJobEdit | null
    {
        return this.dataObject.selectedMainJob;
    }

    setSelectedMainJob(job : IMainJobEdit | null)
    {
        this.dataObject.selectedMainJob = job;
    }

    getSelectedSubJob() : ISubJobEdit | null
    {
        return this.dataObject.selectedSubJob;
    }

    setSelectedSubJob(job : ISubJobEdit | null)
    {
        this.dataObject.selectedSubJob = job;
    }

    getMainJobList() : IMainJobEdit[]
    {
        return this.dataObject.valueTree;
    }

    clear()
    {
        this.dataObject = JSON.parse(this.emptyData);
    }

    create(data: IJobData)
    {
        this.dataObject.valueTree = data.jobs;
        this.emptyData = JSON.stringify(this.dataObject);

        console.log(data);

        return this;

        // data.jobs[0].subJobs[0].info[0].items[0].value = "";

        // this.dataObject.valueTree = data.jobs

        // this.dataObject.valueTree = data.jobs.map(mjob =>
        // {
        //     const aaaa : IMainJobEdit = 
        //     {
        //         ...mjob,

        //         subJobs: mjob.subJobs.map(sj =>
        //         {                    
        //             const bbbb : ISubJobEdit = () =>
        //             {
        //                 ...sj,
        //                 info: 
        //             }

        //             return bbbb;
        //         }),

        //         // subJobs: mjob.subJobs.map(sjob => 
        //         // {
        //         // return {
        //         //     ...sjob,
        //         //     // key: generateUuid(),
        //         //     info: sjob.info.map(info =>
        //         //     {
        //         //     return {
        //         //         ...info,
        //         //         // key: generateUuid()
        //         //     }
        //         //     })
        //         // }
        //         // })
        //     }

        //     return {
        //         ...mjob,
        //         subJobs: mjob.subJobs.map(sjob => 
        //         {
        //         return {
        //             ...sjob,
        //             // key: generateUuid(),
        //             info: sjob.info.map(info =>
        //             {
        //             return {
        //                 ...info,
        //                 // key: generateUuid()
        //             }
        //             })
        //         }
        //         })
        //     }
        // });
    }
}

