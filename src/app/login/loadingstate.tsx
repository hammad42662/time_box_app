import LoadingSvg from "./loadingSvg";

export default function LoadingState() {
  return (
    <div
      role="status"
      className=" flex flex-row justify-center items-center mt-96"
    >
      <LoadingSvg />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
