import { useRouter } from "next/router";
import React, { useState } from "react";

function CreateDropdown() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          onClick={() => {
            setShow(!show);
          }}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>

        {show && (
          <div className="absolute top-20 right-0 z-[100] w-48 py-2 mt-2 bg-white rounded-md shadow-xl :bg-gray-800">
            <a
              onClick={() => {
                router.push("/class/join");
              }}
              className="block px-4 py-3 text-sm text-gray-600 cursor-pointer transition-colors duration-200 transform :text-gray-300 hover:bg-gray-100 :hover:bg-gray-700 :hover:text-white"
            >
              {" "}
              Join Class{" "}
            </a>
            <a
              onClick={() => {
                router.push("/class/create");
              }}
              className="block px-4 py-3 text-sm text-gray-600 cursor-pointer transition-colors duration-200 transform :text-gray-300 hover:bg-gray-100 :hover:bg-gray-700 :hover:text-white"
            >
              Create Class{" "}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateDropdown;
