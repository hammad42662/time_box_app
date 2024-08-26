import Image from "next/image";
import logo from "../../../public/task-box-logo.png";

export default function NavContent() {
  return (
    <div className=" mt-4 mb-4">
      <div className=" w-full">
        <Image src={logo} className=" w-36 h-full" alt="" />
      </div>
    </div>
  );
}
