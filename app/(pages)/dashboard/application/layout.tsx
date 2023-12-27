import React from "react";
import Preview from "./_components/Preview";
import ApplicationFilter from "./_components/ApplicationFilter";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Preview />
      <ApplicationFilter />
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default layout;
