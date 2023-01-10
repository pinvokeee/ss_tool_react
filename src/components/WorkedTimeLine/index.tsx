import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, timelineItemClasses } from "@mui/lab";
import { Box, Card, CardContent, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { IFieldConfig, IFieldSetting } from "../../contexts/types/interface";
import { IUseEditState } from "../../hooks";
import { generateUuid } from "../../util/util";
import { TextPreView } from "../TextPreView";

interface IPreViewText
{
  children : React.ReactNode,
}

const PreView = (props: IPreViewText) =>
{
  return <>
  </>
}

const createContentElement = (item: IFieldSetting) =>
{
  const arr = item.onGetValueArray?.call(this);

  if (item.type == "jobSelecter")
  {
    return <>    
      <Case>
        <MainJobLabel>メイン</MainJobLabel>
        <JobContent>{arr ? arr[0] : ""}</JobContent>
      </Case>  
      <Case>
        <SubJobLabel>サブ</SubJobLabel>
        <JobContent>{arr ? arr[1] : ""}</JobContent>
      </Case>  
    </>
  }

  return <TextPreView>{item.onGetValue?.call(this)}</TextPreView>
}

const PreviewCard = styled(Paper)((theme) => 
(
  {
    padding: "16px",
  }
));

const Label = styled("div")((theme) => 
(
  {
    fontSize: "10pt",
    padding: "4px 6px 4px 6px",
    borderRadius: "4px",

  }
));

const MainJobLabel = styled(Label)((theme) => 
(
  {
    color: "#f5f6fa",
    backgroundColor: "#0097e6",
    width: "50px",
    textAlign: "center"
  }
));

const SubJobLabel = styled(Label)((theme) => 
(
  {
    color: "#f5f6fa",
    backgroundColor: "#44bd32",
    width: "50px",
    textAlign: "center"
  }
));


const JobContent = styled(Label)((theme) => 
(
  {
  }
));


interface ICaseProps
{
  children: React.ReactNode;
}

const Case = (props: ICaseProps) =>
{
  return (
    <Stack sx={{ marginTop: "16px", marginBottom: "16px" }} direction={"row"}>{props.children}</Stack>
  )
}

interface IWorkedTimeLineProps
{
  fieldConfig : IFieldConfig,
  editStateHook : IUseEditState,
}

export const WorkedTimeLine = (props : IWorkedTimeLineProps) =>
{
    const timelineitems: IFieldSetting[] = [];
    props.fieldConfig.blocks.forEach(block => block.items.filter(item => item.no > -1).forEach(mitem => timelineitems.push(mitem)));

    return (
      <Box sx={{ overflowY: "auto", borderRight: "1px solid lightgray", height: "100%" }}>
        <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, }, }} position="right">
            {
              timelineitems.map((item, index) =>
                {
                      return (      
                        <TimelineItem >    
                          <TimelineSeparator>
                          <TimelineDot />
                          { (index < timelineitems.length - 1) ? <TimelineConnector /> : <></> }
                          </TimelineSeparator>
                          <TimelineContent sx={{ width: "100px" }}>

                            <PreviewCard variant="outlined" square>
                            {/* <CardContent> */}
                              <Typography sx={{ fontSize: "10pt", fontWeight: "bold", wordWrap: "break-word" }}>
                                {`${item.no}.${item.caption}`}
                              </Typography>
 
                              {createContentElement(item)}
 
                            {/* </CardContent> */}
                            </PreviewCard>

                            
                          </TimelineContent>
                        </TimelineItem>);              
                })
            }
        </Timeline>
      </Box>
 
      );
}