import React from "react";
import { PiWarningCircle } from "react-icons/pi";

const Alert = ({ message }: { message: string }) => {
  return (
    <div className="w-full flex gap-2 items-center border font-normal text-sm text-danger border-danger rounded-lg p-2">
      <PiWarningCircle size={18}/>
      <h1>{message}</h1>
    </div>
  );
};

export default Alert;
