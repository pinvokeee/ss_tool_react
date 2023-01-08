import React from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material';
import { AppToolBar } from './components/AppBar';
import { WorkedTimeLine } from './components/WorkedTimeLine';
import { WorkedContainer } from './components/WorkedContainer';
import { BottomBar } from './components/BottomBar';
import { IJobData } from './contexts/types/interface';
import { contextIJobData, useContextIJobData } from './contexts/contexts';
import { useEditState } from './hooks';
import { generateUuid } from './util/util';

export const AppLayoutContainer = styled("div")(({ theme }) => 
(
    {
        display: "grid",
        width: "100%",
        height: "100vh",
        gridTemplateRows: "auto minmax(0, 1fr) auto",
    }
));

export const WorkbenchLayoutContainer = styled("div")(({ theme }) =>
(
  {    
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    height: "100%",
    overflow: "auto",
  }
));

function App() 
{
  /* @ts-ignore */
  // const job_data : IJobData = (jobData as IJobData).jobs.map(mjob => 
  //   {
  //     return mjob.subJobs.map(sjob =>
  //       {
  //         sjob.key = generateUuid();
  //         return sjob;
  //       });
  //   });

  /* @ts-ignore */
  const base_job_data = (jobData as IJobData);
  const job_data : IJobData = 
  {
    ...base_job_data,
    jobs: base_job_data.jobs.map(mjob =>
    {
      return {
        ...mjob,
        subJobs: mjob.subJobs.map(sjob => 
        {
          return {
            ...sjob,
            key: generateUuid(),
            info: sjob.info.map(info =>
            {
              return {
                ...info,
                key: generateUuid()
              }
            })
          }
        })
      }
    })
  }

  console.log(job_data);

  const editState = useEditState();

  // const jobDataContext = useContextIJobData(a);
  // const context = useContext(contextIJobData);

  return (

    <div className="App">

    {/* <contextIJobData.Provider value={jobDataContext}> */}
      
      <AppLayoutContainer>
        <AppToolBar></AppToolBar>
        <WorkbenchLayoutContainer >
          <WorkedContainer jobData={job_data} editStateHook={editState}></WorkedContainer>
        </WorkbenchLayoutContainer>
        <BottomBar jobData={job_data} editStateHook={editState}></BottomBar>
      </AppLayoutContainer>

    {/* </contextIJobData.Provider> */}
    
    </div>
  );
}

export default App;
