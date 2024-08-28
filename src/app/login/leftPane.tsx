import Svg from "./svg";

export default function LeftPane() {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 text-black">
      <div className="max-w-md text-center">
        <Svg />
      </div>
    </div>
  );
}
