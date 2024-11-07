"use client";
import React, { useState, useRef } from "react";
import ItemBarcode from "./components/ItemBarcode";
import CreateForm from "./components/CreateForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Label from "./components/Label";
import PageSetup from "./components/PageSetup";
import { useBarcodeContext } from "@/contexts/BarcodeContext";
import { usePageSetupContext } from "@/contexts/SetupContext";

const mergeArrays = (placeholders: any, barcodes: any) => {
  return placeholders.map((placeholder: any, idx: any) => {
    // Find if there’s a barcode at this index
    const barcodeItem = barcodes.find((item: any) => item.index === idx);
    return barcodeItem ? barcodeItem : placeholder;
  });
};

const Page = () => {
  const [isCapture, setIsCapture] = useState<boolean>(false);
  const { barcode } = useBarcodeContext();
  const { pageSetup } = usePageSetupContext();
  const a4Ref = useRef<HTMLDivElement | any>(null);
  const labelRef = useRef<HTMLDivElement | any>(null);

  const placeholders = Array(pageSetup.labelCount)
    .fill(null)
    .map((_, index) => ({ id: index, value: `p${index + 1}` }));

  const mergedArray = mergeArrays(placeholders, barcode);

  const downloadPDF = async () => {
    setIsCapture(true);
    const targetCanvas = a4Ref.current;
    const pdf = new jsPDF({ format: "a4" });

    setTimeout(async () => {
      const canvas = await html2canvas(targetCanvas, { scale: 2 });
      const imgData = await canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 4, 19, 200, 285);
      pdf.save("barcode.pdf");
      setIsCapture(false);
    }, 100);
  };

  return (
    <section className="bg-base-300 p-10">
      <div className="flex justify-around">
        <article className="flex w-[480px] flex-col gap-2">
          <PageSetup />
          <CreateForm />
          <button
            onClick={downloadPDF}
            className="btn btn-primary btn-lg mt-14 w-full italic tracking-widest shadow-lg"
          >
            Save to PDF
          </button>
        </article>

        <div className="h-fit w-fit bg-white p-6">
          <div id="canvas" ref={a4Ref} className="a4">
            <div className="grid grid-cols-[repeat(5,_38mm)] grid-rows-12 justify-items-start gap-x-[5mm] gap-y-[0.7mm]">
              {mergedArray.map((item: any, idx: any) =>
                item.barcode ? (
                  <ItemBarcode
                    key={idx}
                    barcode={item.barcode}
                    text={item.text}
                  />
                ) : (
                  <Label
                    ref={labelRef}
                    key={idx}
                    className={`${isCapture ? "invisible" : "visible"} noprint border border-dashed border-gray-400`}
                  >
                    {idx + 1}
                  </Label>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
