"use client";
import React from "react";
import Barcode from "react-barcode";

const ItemBarcode = ({ barcode, text }: any) => {
  return (
    <div>
      {/* {text.length && (
      )} */}
      <h5 className="line-clamp-1 text-sm tracking-wide">{text}</h5>

      <Barcode
        value={barcode}
        format="EAN13"
        width={1.2}
        height={45}
        marginTop={1}
      />
    </div>
  );
};

export default ItemBarcode;
