"use client";
import { useBarcodeContext } from "@/contexts/BarcodeContext";
import { usePageSetupContext } from "@/contexts/SetupContext";
import React, { useState } from "react";

const initItem = { barcode: 123456789012, text: "", index: 0 };

const CreateForm = () => {
  const [barcodeList, setBarcodeList] = useState<any>([initItem]);
  const [labelCount, setLabelCount] = useState<number>(1);
  const { setBarcode } = useBarcodeContext();
  const { setPageSetup } = usePageSetupContext();

  const handleChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const maxLength = 12;
    const newValue = name === "barcode" ? value.slice(0, maxLength) : value;

    setBarcodeList((prev: any) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [name]: newValue,
        index,
      };
      return newList;
    });
  };

  const handleAddInput = () => {
    setPageSetup({ labelCount });
    setBarcodeList((prev: any) => {
      if (labelCount > prev.length) {
        // Add new items if labelCount is greater than current length
        const newItems = Array(labelCount - prev.length)
          .fill(null)
          .map((_, index) => ({
            barcode: "",
            text: "",
            index: prev.length + index,
          }));

        const newList = [...prev, ...newItems];
        return newList.map((item, idx) => ({ ...item, index: idx })); // Re-index
      } else {
        // Trim items if labelCount is less than or equal to current length
        const newList = prev.slice(0, labelCount);
        return newList.map((item: any, idx: any) => ({ ...item, index: idx })); // Re-index
      }
    });
  };

  const handleRemoveClick = (index: any) => {
    setBarcodeList((prev: any) => {
      const newList = prev.filter((item: any) => item.index !== index);

      // Re-index the remaining items
      return newList.map((item: any, idx: any) => ({ ...item, index: idx }));
    });
  };

  const handleResetClick = () => {
    setBarcodeList(() => [...Array(1).fill(initItem)]);
  };

  return (
    <div className="bg-base-100 p-2 shadow">
      <div className="py-2x flex items-center justify-between">
        <div className="text-lg tracking-wider">Number of Label</div>
        <div>
          <input
            type="number"
            value={labelCount}
            onFocus={(e) => e.target.select()}
            className="input input-sm input-bordered mx-2 w-14 text-center"
            onChange={(e: any) => setLabelCount(Number(e.target.value))}
          />
          <button
            onClick={handleAddInput}
            disabled={labelCount <= 0}
            className="btn btn-primary btn-sm"
          >
            Set Label
          </button>
        </div>
      </div>

      <div className="divider divider-neutral my-2 h-1"></div>

      <table className="table table-sm text-center">
        <thead>
          <tr>
            <th>Label</th>
            <th>Barcode Number</th>
            <th>Product Name</th>
          </tr>
        </thead>

        <tbody>
          {barcodeList.map((item: any, idx: any) => (
            <tr key={idx} className="group hover">
              {barcodeList.length === 1 ? (
                <th className="text-center">{idx + 1}</th>
              ) : (
                <>
                  <th className="table-cell text-center group-hover:hidden">
                    {idx + 1}
                  </th>

                  <th className="hidden text-center group-hover:table-cell">
                    <button onClick={() => handleRemoveClick(idx)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-6 text-error"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </th>
                </>
              )}

              <th>
                <input
                  type="number"
                  name="barcode"
                  value={item.barcode}
                  onFocus={(e) => e.target.select()}
                  className="input input-bordered h-8 w-[120px] text-sm leading-8"
                  onChange={(e) => handleChange(e, idx)}
                />
              </th>
              <th>
                <input
                  type="text"
                  name="text"
                  value={item.item}
                  className="input input-bordered h-8 w-full text-sm leading-8"
                  onChange={(e) => handleChange(e, idx)}
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="divider divider-neutral my-2 h-1"></div>

      <div className="flex w-full flex-col gap-2">
        <button
          onClick={() => setBarcode(barcodeList)}
          className="btn btn-outline"
        >
          Preview
        </button>

        {barcodeList.length > 1 ? (
          <button
            onClick={handleResetClick}
            className="btn btn-outline btn-error"
          >
            reset
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CreateForm;
