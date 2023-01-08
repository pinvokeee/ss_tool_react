import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, timelineItemClasses } from "@mui/lab";
import { Box } from "@mui/material";
import { IFieldConfig, IFieldSetting } from "../../contexts/types/interface";

interface IWorkedTimeLineProps
{
  fieldConfig : IFieldConfig,
}

export const WorkedTimeLine = (props : IWorkedTimeLineProps) =>
{
    const timelineitems: IFieldSetting[] = [];
    props.fieldConfig.blocks.forEach(block => block.items.filter(item => item.no > -1).forEach(mitem => timelineitems.push(mitem)));

    return (
      <Box sx={{ borderRight: "1px solid lightgray", height: "100%" }}>
        <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, }, }} position="right">
            {
              timelineitems.map((item, index) =>
                {
                      return (      
                        <TimelineItem>    
                          <TimelineSeparator>
                          <TimelineDot />
                          { (index < timelineitems.length - 1) ? <TimelineConnector /> : <></> }
                          </TimelineSeparator>
                          <TimelineContent sx={{ width: "100px" }}>{`${item.no}.${item.caption}`}</TimelineContent>
                        </TimelineItem>);              
                })
            }
        </Timeline>
      </Box>
 
      );
}