import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./Loader.css";

const Loader = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="loaderwrapper">
        <div class="loader"></div>
      </div>
    )
  );
};

export default Loader;
