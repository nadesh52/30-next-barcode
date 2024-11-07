"use client";
import React from "react";
import Barcode from "react-barcode";

const ItemBarcode = ({ barcode, text }: any) => {
  return (
    <div>
      <h5 className="line-clamp-1 text-sm tracking-wide">{text}</h5>
      <Barcode
        value={barcode}
        format="EAN13"
        width={1.05}
        height={42}
        marginTop={1}
      />
    </div>
  );
};

export default ItemBarcode;
