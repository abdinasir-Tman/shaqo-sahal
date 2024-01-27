import Image from "next/image";
import React from "react";
// Path to your downloaded SVG

const EmptyDataComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <Image
        alt="empty"
        height={300}
        width={200}
        src={"/no-data.svg"}
        className="w-1/2 h-1/2 mb-4"
      />
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        No Data Available
      </h1>
      <p className="text-gray-600">
        We couldn't find any data to display here.
      </p>
    </div>
  );
};

export default EmptyDataComponent;
