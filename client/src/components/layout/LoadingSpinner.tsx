"use client";

import { Spinner } from "flowbite-react";

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <Spinner aria-label="Loading" />
    </div>
  );
};

export default LoadingSpinner;
