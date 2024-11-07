"use client";
import React, { createContext, useContext, useState } from "react";

const SetupContext = createContext<any>(null);

export const usePageSetupContext = () => {
  return useContext(SetupContext);
};

export const PageSetupProvider = ({ children }: any) => {
  const [pageSetup, setPageSetup] = useState<any>([]);

  return (
    <SetupContext.Provider value={{ pageSetup, setPageSetup }}>
      {children}
    </SetupContext.Provider>
  );
};
