import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">Wilson &copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Test - ReactJS</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
