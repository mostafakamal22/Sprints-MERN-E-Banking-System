import BeatLoader from "react-spinners/BeatLoader";

export const MainSpinner = ({
  isLoading,
  spinnerHeight = "80vh",
  spinnerSize = 45,
}) => {
  return (
    <div
      style={{ minHeight: spinnerHeight }}
      className="flex justify-center items-center"
    >
      <BeatLoader
        className="m-auto"
        color={"rgb(30, 79, 217)"}
        loading={isLoading}
        size={spinnerSize}
      />
    </div>
  );
};
