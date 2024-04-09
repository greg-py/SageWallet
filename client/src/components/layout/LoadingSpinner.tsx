"use client";

import { Spinner } from "flowbite-react";

const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner size={"xl"} aria-label="Loading" />
    </div>
  );
};

export default LoadingSpinner;
