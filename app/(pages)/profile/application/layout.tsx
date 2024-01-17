import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mt-10 px-5 md:px-0 w-full">{children}</div>
    </div>
  );
};

export default layout;
