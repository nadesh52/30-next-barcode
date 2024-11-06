"use client";
import React, { createContext, useContext, useState } from "react";

const BarcodeContext = createContext<any>(null);

export const useBarcodeContext = () => {
  return useContext(BarcodeContext);
};

export const BarcodeProvider = ({ children }: any) => {
  const [barcode, setBarcode] = useState<any>([]);

  return (
    <BarcodeContext.Provider value={{ barcode, setBarcode }}>
      {children}
    </BarcodeContext.Provider>
  );
};
