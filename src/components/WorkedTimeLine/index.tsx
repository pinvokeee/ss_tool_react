import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, timelineItemClasses } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { IFieldConfig, IFieldSetting } from "../../contexts/types/interface";
import { IUseEditState } from "../../hooks";
import { generateUuid } from "../../util/util";
import { TextPreView } from "../TextPreView";

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
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", wordWrap: "break-word" }}>
                              {`${item.no}.${item.caption}`}
                            </Typography>

                            <TextPreView>
                              { item.onGetValue?.call(this)  }
                            </TextPreView>
                            
                          </TimelineContent>
                        </TimelineItem>);              
                })
            }
        </Timeline>
      </Box>
 
      );
}