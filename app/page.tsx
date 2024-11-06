"use client";
import React from "react";
import ItemBarcode from "./components/ItemBarcode";
import { useRef } from "react";
import CreateForm from "./components/CreateForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useBarcodeContext } from "@/contexts/BarcodeContext";

const page = () => {
  const { barcode } = useBarcodeContext();
  const a4Ref = useRef<HTMLDivElement | any>(null);

  barcode.length && console.log(barcode[0].text);

  const downloadPDF = () => {
    const targetCanvas = a4Ref.current;

    html2canvas(targetCanvas, { scale: 5 }).then((canvas: any) => {
      const imgData = canvas.toDataURL("image/svg");
      const pdf = new jsPDF({ format: "a4" });
      pdf.addImage(imgData, "PNG", 4, 19, 200, 285);
      pdf.save("barcode.pdf");
    });
    // html2canvas(targetCanvas, {})
  };

  return (
    <section className="bg-base-300 p-10">
      <div className="flex justify-around">
        <article className="flex w-[480px] flex-col">
          <CreateForm />

          <button
            onClick={downloadPDF}
            className="btn btn-primary btn-lg w-full italic mt-16 tracking-widest shadow-lg"
          >
            Save to PDF
          </button>
        </article>

        <div className="p-6 bg-white w-fit h-fit">
          <div id="canvas" ref={a4Ref} className="a4">
            <div className="grid grid-cols-5 grid-rows-12 justify-items-center gap-x-[6mm] gap-y-[1mm]">
              {/* {[...Array(6)].map((x, i) => (
              <div key={i} className="label">
                <ItemBarcode />
                
              </div>
            ))} */}
              {barcode.map((bc: any, idx: any) => (
                <div key={idx} className="label">
                  <ItemBarcode barcode={bc.barcode} text={bc.text} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
