import { createContext } from "react";
import { CreateContextEnviroment, CreateDefaultContextEnviroment, IContextEnviroment } from "../util/context";
import { IJobData } from "./types/interface";

export const contextIJobData = createContext<IContextEnviroment<IJobData | null>>(CreateDefaultContextEnviroment<IJobData | null>());
export const useContextIJobData = (defaultValue : IJobData | null) : IContextEnviroment<IJobData | null> => 
    CreateContextEnviroment<IJobData | null>(defaultValue);
