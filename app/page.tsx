"use client"

import TukanTomek from "@/components/TukanTomek";
import jungleBackground from "./Images/jungle.svg";
import polanaBackground from "./Images/polana.svg";
import { useAtomValue } from "jotai";
import { isOnPolanaAtom } from "@/lib/atoms";

export default function Home() {
  const isOnPolana = useAtomValue(isOnPolanaAtom);
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 py-24 xl:px-24 md:px-8 px-4">
      <div
        className="fixed top-0 left-0 w-full h-full -z-20 blur-md"
        style={{
          background: `url("${
            isOnPolana ? polanaBackground.src : jungleBackground.src
          }") repeat center center/cover`,
        }}
      ></div>
      <h1 className="text-4xl font-poppins font-bold text-center">
        Wycieczka po dżungli
      </h1>
      <h2 className="text-2xl font-poppins font-bold text-center">
        Z tukanem Tomkiem
      </h2>
      <TukanTomek />
    </main>
  );
}
