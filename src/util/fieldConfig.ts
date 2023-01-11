import { useContext } from "react";
import { IJobData, IFieldConfig, IMainJOB } from "../contexts/types/interface";
import { IUseEditState, useEditState } from "../hooks";
import {  Store } from "../hooks/index2";
import { IContextEnviroment } from "./context";


export const InitConfig = (storeObject: Store) : IFieldConfig =>
{
    return {
        blocks: 
        [
            {
                options:
                [
                    {
                        no: 1,
                        caption: "タイトル",
                        type: "text",
                        valueType: "string",
                        getter: () => storeObject.getTitle(),
                        setter: (value: string) => storeObject.setTitle(value),
                    },
                ]
            },

            {
                options:
                [
                    {
                        no: 2,
                        caption: "職種",
                        type: "jobSelecter",
                        valueType: "jobData",

                        getter: () => [storeObject.getSelectedMainJob(), storeObject.getSelectedSubJob()],
                        setter: (jobs) => 
                        {
                            storeObject.setSelectedMainJob(jobs[0]);
                            storeObject.setSelectedSubJob(jobs[1]);
                        }
                    },

                    {
                        no: -1,
                        caption: "TIPS",
                        type: "readonly",
                        valueType: "string",

                        getter: () => storeObject.getTips(),
                    }
                ]
            },

            {
                options:
                [
                    {
                        no: 3,
                        caption: "内容",
                        type: "infoList",
                        valueType: "string",

                        // onGetValue: () =>
                        // {
                        //     if (editStateHook.subJob == null) return "";

                        //     const s = editStateHook.subJob.info.filter(inf => inf.checked).map(info =>
                        //     {
                        //        return info.items.map(v => [v.name, `${v.prefix}${v.value}${v.suffix}`]);
                        //     });

                        //     console.log(editStateHook.subJob);
                        //     console.log(s);

                        //     return "";
                        // }
                    },

                    {
                        no: 4,
                        caption: "フリー入力",
                        type: "multiLineText",
                        valueType: "string",
                        getter: () => storeObject.getFreeText(),
                        setter: (value: string) => storeObject.setFreeText(value),
                    }
                ]
            },

            {
                options:
                [
                    {
                        no: 5,
                        caption: "退職理由",
                        type: "multiLineText",
                        valueType: "string",
                        getter: () => storeObject.getReason(),
                        setter: (value: string) => storeObject.setReason(value),
                    }
                ]
            }
        ]
    }
}

