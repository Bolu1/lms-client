import React from "react";

function Loader() {
  return (
    <div>
      <div>
        <div className="flex  justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;