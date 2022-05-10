import ScaleLoader from "react-spinners/ScaleLoader";

export const LoadingSpinner = () => {
  return (
    <div className="bg-app-black bg-opacity-70 top-0 bottom-0 left-0 h-screen w-screen fixed flex items-center justify-center z-50">
      <div className="bg-white rounded-lg px-8 py-2 flex flex-col items-center z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ScaleLoader />
        <p className="text-center">Loading...</p>
      </div>
    </div>
  );
};


