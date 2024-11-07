"use client";
import { usePageSetupContext } from "@/contexts/SetupContext";
import React from "react";

const PageSetup = () => {
  const { setPageSetup } = usePageSetupContext();

  return (
    <div className="bg-base-100 p-2 shadow">
      <button className="btn btn-primary">Submit</button>
      
      <div>label size</div>
      <div>column</div>
      <div>margin x</div>
      <div>margin y</div>
    </div>
  );
};

export default PageSetup;
