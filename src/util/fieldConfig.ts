import { useContext } from "react";
import { IJobData, IFieldConfig, IMainJOB } from "../contexts/types/interface";
import { IUseEditState, useEditState } from "../hooks";
import { IContextEnviroment } from "./context";

export const createConfig = (jobData : IJobData, editStateHook : IUseEditState) : IFieldConfig =>
{
    return {
        blocks: 
        [
            {
                items:
                [
                    {
                        no: 1,
                        caption: "タイトル",
                        type: "text",
                        valueType: "string",
                        onGetValue: (() : string  => editStateHook.title),
                        onChange: (newValue : string) =>
                        {
                            editStateHook.setTitle(newValue);
                        }
                    }
                ]
            },

            {
                items:
                [
                    {
                        no: 2,
                        caption: "職種",
                        type: "jobSelecter",
                        valueType: "jobData",
                        
                        onGetValue: () =>
                        {
                            const m = editStateHook.mainJob != null ? editStateHook.mainJob.name : "";
                            const s = editStateHook.subJob != null ? editStateHook.subJob.name : "";

                            return `メイン:${m}\nサブ:${s}`
                        }
                    },

                    {
                        no: -1,
                        caption: "TIPS",
                        type: "readonly",
                        valueType: "string",

                        onGetValue: (() : string  => 
                        {
                            if (editStateHook.subJob == null) return "";
                            return editStateHook.subJob.tips;
                        }),
                    }
                ]
            },

            {
                items:
                [
                    {
                        no: 3,
                        caption: "内容",
                        type: "infoList",
                        valueType: "string",

                        onGetValue: () =>
                        {
                            if (editStateHook.subJob == null) return "";

                            const s = editStateHook.subJob.info.filter(inf => inf.checked).map(info =>
                            {
                               return info.items.map(v => [v.name, `${v.prefix}${v.value}${v.suffix}`]);
                            });

                            console.log(editStateHook.subJob);
                            console.log(s);

                            return "";
                        }
                    },

                    {
                        no: 4,
                        caption: "フリー入力",
                        type: "multiLineText",
                        valueType: "string",
                        onGetValue: () => editStateHook.freeText,
                        onChange: (newValue : string) =>
                        {
                            editStateHook.setFreeText(newValue);
                        }
                    }
                ]
            },

            {
                items:
                [
                    {
                        no: 5,
                        caption: "退職理由",
                        type: "multiLineText",
                        valueType: "string",
                        onGetValue: () => editStateHook.reason,
                        onChange: (newValue : string) =>
                        {
                            editStateHook.setReasonText(newValue);
                        }
                    }
                ]
            }
        ]
    }
}