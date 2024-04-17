import { Spinner } from "flowbite-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Spinner size={"xl"} aria-label="Loading" />
    </div>
  );
};

export default LoadingOverlay;
