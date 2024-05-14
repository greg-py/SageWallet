const Error = () => {
  return (
    <div className="flex items-center justify-center h-full bg-base-200 py-10 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-300">
          Something Went Wrong
        </h2>
        <button
          className="btn btn-error"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
