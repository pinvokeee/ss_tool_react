import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Snackbar, styled } from '@mui/material';
import { AppToolBar } from './components/AppBar';
import { WorkedTimeLine } from './components/WorkedTimeLine';
import { WorkedContainer } from './components/WorkedContainer';
import { BottomBar } from './components/BottomBar';
import { IJobData, SnackBarState } from './contexts/types/interface';
import { contextIJobData, useContextIJobData } from './contexts/contexts';
import { useEditState } from './hooks';
import { generateUuid } from './util/util';
import { contextSnackBarState, ProviderSnackBarContext, setSnackBarStateContext } from './Provider/ProviderSnackBarContext';

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

/* @ts-ignore */
const base_job_data = jobData as IJobData;

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


function App() 
{
  const editState = useEditState(job_data);


  return (

    <div className="App">

      <ProviderSnackBarContext>



      <AppLayoutContainer>
        <AppToolBar></AppToolBar>
          <WorkbenchLayoutContainer >
            <WorkedContainer 
              jobData={job_data} 
              editStateHook={editState}  />
          </WorkbenchLayoutContainer>
        <BottomBar jobData={job_data} editStateHook={editState}></BottomBar>
      </AppLayoutContainer>
      </ProviderSnackBarContext>

    {/* </contextIJobData.Provider> */}
    
    </div>
  );
}

export default App;
