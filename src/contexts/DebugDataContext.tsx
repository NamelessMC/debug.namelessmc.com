import React from 'react';
import {DebugData} from "../types/DebugData";

const DebugDataContext = React.createContext({} as DebugData);

export const DebugDataProvider = DebugDataContext.Provider;

export default DebugDataContext;
