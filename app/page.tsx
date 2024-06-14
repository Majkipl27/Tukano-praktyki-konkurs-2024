import Image from "next/image";
import Tukan_Tomek from "./Images/Tukan_Tomek.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24">
      <h1 className="text-4xl font-poppins font-bold">Wycieczka po dżungli</h1>
      <Image src={Tukan_Tomek} alt="" width={192} height={218} />
    </main>
  );
}
