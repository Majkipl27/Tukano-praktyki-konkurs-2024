"use client";

import { dialogueNumberAtom, isOnPolanaAtom } from "@/lib/atoms";
import { useAtom, useSetAtom } from "jotai";
import { dialogues, fetchPath } from "@/lib/dialogues";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTypewriter } from "@/lib/useTypewriter";
import Canvas from "./Canvas";

const Typewriter = ({
  text,
  speed,
  setIsTyping,
}: {
  text: string;
  speed: number;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <p className="font-poppins text-xl px-4 text-center">
      {useTypewriter(text, speed, setIsTyping)}
    </p>
  );
};

export default function Dialogue() {
  const [dialogueNumber, setDialogueNumber] = useAtom(dialogueNumberAtom);
  const setIsOnPolana = useSetAtom(isOnPolanaAtom);
  const [dialogueText, setDialogueText] = useState<string>("");
  const [hasChosenOption, setHasChosenOption] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [map, setMap] = useState<File | null>(null);
  const [isDrawOpen, setIsDrawOpen] = useState<boolean>(false);
  const [path, setPath] = useState<{ distance: number; path: string[] } | null>(
    null
  );

  useEffect(() => {
    if (!hasChosenOption) {
      setDialogueText("");
    }
    if (dialogueNumber === 11) {
      setDialogueText(
        `Najkrótsza ścieżka ma długość ${
          path?.distance
        } i prowadzi kolejno przez wierzchołki: ${path?.path.join(", ")}`
      );
      return;
    } else if (dialogueNumber === 13) {
      setDialogueText(
        `(Idziecie z Tukanem Tomkiem przez dżunglę przez ${path?.distance} minut.)`
      );
      return;
    } else if (dialogueNumber === 14) {
      setIsOnPolana(true);
    }
    setDialogueText(dialogues[dialogueNumber].text);
    setHasChosenOption(false);
  }, [dialogueNumber, hasChosenOption, path, setIsOnPolana]);

  useEffect(() => {
    if (map === null) return;
    async function fetchPathFromAPI() {
      if (map === null) return;
      setDialogueNumber(8);
      const res: number | { distance: number; path: string[] } =
        await fetchPath(map);
      if (typeof res === "number") {
        setDialogueNumber(9.5);
        return;
      } else {
        setPath(res as { distance: number; path: string[] });
        setDialogueNumber(10.5);
        return;
      }
    }
    fetchPathFromAPI();
  }, [map]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {isDrawOpen && (
        <Canvas setIsOpen={setIsDrawOpen} isOpen={isDrawOpen} setMap={setMap} />
      )}
      <Typewriter text={dialogueText} speed={50} setIsTyping={setIsTyping} />
      <div className="flex items-center justify-end gap-4">
        {isTyping ? null : dialogueNumber === 7 ? (
          <>
            <label
              htmlFor="mapa"
              className="block cursor-pointer w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
            >
              Podaj mapę (Max 3MB)
            </label>
            <input
              type="file"
              name="mapa"
              id="mapa"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setMap(file);
                }
              }}
              className="hidden"
            />
            <button
              onClick={() => {
                setIsDrawOpen(true);
              }}
              className="block w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
            >
              Narysuj mapę
            </button>
          </>
        ) : (
          dialogues[dialogueNumber].options.map((choice, index) => (
            <button
              key={index}
              onClick={() => {
                setDialogueNumber(choice.next);
                setHasChosenOption(true);
              }}
              className="block w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
            >
              {choice.text}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
