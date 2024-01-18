import React from "react";

const JobSkeleton = () => {
  return (
    <div className="grid  gap-4 animate-pulse">
      {Array(20)
        // @ts-ignore
        .fill()
        .map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-sm bg-gradient-to-tl p-2  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200 cursor-pointer"
          >
            {/* title placeholder*/}
            <div className="flex space-x-3 mb-2 animate-pulse">
              {/* logo  */}
              <div className="w-8 h-8 rounded-md p-1 bg-gradient-to-tr object-fill  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  animate-pulse"></div>
              {/* title  */}
              <div>
                <h1 className="bg-gradient-to-tr h-5 w-32  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  animate-pulse"></h1>
              </div>
            </div>
            <hr />
            <div className="flex justify-between mt-3">
              <span className="bg-gradient-to-tr w-20 h-5  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  animate-pulse"></span>
              <span className="bg-gradient-to-tr w-5  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  animate-pulse"></span>
            </div>
            <div>
              <p className="bg-gradient-to-tr h-10 w-50  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  my-1 animate-pulse"></p>
              <h1 className="bg-gradient-to-tr h-6 w-6  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  mt-2 float-right animate-pulse"></h1>
              <h1 className="bg-gradient-to-tr h-6 w-6  dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200  mt-2 float-left animate-pulse"></h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobSkeleton;
