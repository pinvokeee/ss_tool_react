import { Box, Button, Stack, styled } from "@mui/material";
import { randomInt } from "crypto";
import { ReactNode, useContext, useState } from "react";
import { contextIJobData } from "../../contexts/contexts";
import { IFieldConfig, IFieldSetting, IJobData, IMainJOB } from "../../contexts/types/interface";
import { IUseEditState, useEditState } from "../../hooks";
import { createConfig } from "../../util/fieldConfig";
import { FieldBase, InfoInputField, MultiLineTextField, ReadOnlyField } from "../dataInputField/Base";
import { FieldJobTypeSelecter } from "../dataInputField/jobTypeSelecter";
import { WorkedTimeLine } from "../WorkedTimeLine";

const createDataField = ( fieldSetting : IFieldSetting, context : IJobData, editStateHook : IUseEditState ) =>
{
    if (fieldSetting.type == "text") return <FieldBase labelText={`${fieldSetting.no}.${fieldSetting.caption}`} onGetValue={ fieldSetting.onGetValue } onHandle={ fieldSetting.onChange }></FieldBase>;
    if (fieldSetting.type == "multiLineText") return <MultiLineTextField labelText={`${fieldSetting.no}.${fieldSetting.caption}`} onGetValue={ fieldSetting.onGetValue } onHandle={ fieldSetting.onChange }></MultiLineTextField>;
    if (fieldSetting.type == "readonly") return <ReadOnlyField labelText={`${fieldSetting.caption}`} onGetValue={ fieldSetting.onGetValue }></ReadOnlyField>;
    if (fieldSetting.type == "jobSelecter") return <FieldJobTypeSelecter labelText={`${fieldSetting.no}.${fieldSetting.caption}`} mainJobList={context.jobs} editStateHook={editStateHook} ></FieldJobTypeSelecter>;
    if (fieldSetting.type == "infoList") return <InfoInputField labelText={`${fieldSetting.no}.${fieldSetting.caption}`} editStateHook={editStateHook}></InfoInputField>
    return <></>
}

interface IWorkedContainerProps 
{
    jobData : IJobData,
    editStateHook : IUseEditState,
}


const Container = styled("div")(({ theme }) =>
(
  {    
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    height: "100%",
    overflow: "auto",
  }
));


export const WorkedContainer = (props : IWorkedContainerProps) =>
{
    const fieldData = createConfig(props.jobData, props.editStateHook);

    return (
        <Container>
            <WorkedTimeLine fieldConfig={fieldData}></WorkedTimeLine>
            <Stack spacing={4} sx={ { overflowY: "auto", padding: "22px" } }>
                {
                    fieldData.blocks.map((block) => 
                    {
                        return (
                        <Stack direction="row" spacing={2}>
                        {
                            block.items.map((item) => 
                            {
                                return (
                                    createDataField(item, props.jobData, props.editStateHook)
                                );
                            })
                        }
                        </Stack>);
                    })
                }
            </Stack>
        </Container>
    );
}