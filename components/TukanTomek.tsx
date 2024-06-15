import Image from "next/image";
import Tukan_Tomek from "../app/Images/Tukan_Tomek.png";
import Dialogue from "./Dialogue";

export default function TukanTomek() {
  return (
    <div className="flex flex-col items-end w-2/3 gap-16 my-16">
      <Image src={Tukan_Tomek} alt="" width={192} height={218} />
      <div className="w-full h-40 px-4 py-2 bg-amber-800 border-4 border-orange-700 rounded-lg relative">
        <div className="w-8 h-16 bg-orange-700 absolute right-12 -top-10 rounded-full -z-10" />
        <Dialogue />
      </div>
    </div>
  );
}
