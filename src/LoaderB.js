import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./LoaderB.css";

const LoaderB = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="loaderwrapper">
        <div class="loader"></div>
        <h2 id="1"></h2>
        {/* <h2 id="2">Hashing Bank Credentials...</h2> */}
      </div>
    )
  );
};

export default LoaderB;
