import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mt-10 w-full">{children}</div>
    </div>
  );
};

export default layout;
