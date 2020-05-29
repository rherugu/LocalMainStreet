import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./Loader.css";

const Loader = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        className="loaderwrapper"
        style={{
          zIndex: 9999999999,
        }}
      >
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
