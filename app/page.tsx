"use client"

import TukanTomek from "@/components/TukanTomek";
import Image from "next/image";
import jungleBackground from "./Images/jungle.svg";
import polanaBackground from "./Images/polana.svg";
import { useAtomValue } from "jotai";
import { isOnPolanaAtom } from "@/lib/atoms";

export default function Home() {
  const isOnPolana = useAtomValue(isOnPolanaAtom);
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Image
        priority
        src={isOnPolana ? polanaBackground : jungleBackground}
        alt=""
        className="fixed top-0 left-0 w-full -z-20 blur-md"
      />
      <h1 className="text-4xl font-poppins font-bold">Wycieczka po dżungli</h1>
      <h2 className="text-2xl font-poppins font-bold">Z tukanem Tomkiem</h2>
      <TukanTomek />
    </main>
  );
}
