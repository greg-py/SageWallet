const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-base-100 flex justify-center items-center z-50">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default LoadingSpinner;
