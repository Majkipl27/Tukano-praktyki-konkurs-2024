"use client";

import { dialogueNumberAtom, isOnPolanaAtom } from "@/lib/atoms";
import { useAtom, useSetAtom } from "jotai";
import { dialogues, fetchMaps, fetchPath, publishMap } from "@/lib/dialogues";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTypewriter } from "@/lib/useTypewriter";
import Canvas from "./Canvas";
import { CommunityMaps } from "./CommunityMaps";

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
    <p className="font-poppins md:text-lg sm:text-sm px-4 text-center">
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
  const [maps, setMaps] = useState<
    { id: number; data: Buffer; distance: number; path: string }[]
  >([]);
  const [isCommunityMapsOpen, setIsCommunityMapsOpen] =
    useState<boolean>(false);
  const [isPathBeingFetched, setIsPathBeingFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!hasChosenOption) {
      setDialogueText("");
    }
    if (dialogueNumber === 11) {
      if (!path?.distance || !path?.path) {
        setDialogueNumber(10);
        return;
      }
      setDialogueText(
        `Najkrótsza ścieżka ma długość ${
          path?.distance
        } i prowadzi kolejno przez wierzchołki: ${path?.path.join(", ")}`
      );
      return;
    } else if (dialogueNumber === 12 && !map) {
      setDialogueNumber(13);
      return;
    } else if (dialogueNumber === 14) {
      setDialogueText(
        `(Idziecie z Tukanem Tomkiem przez dżunglę przez ${path?.distance} minut.)`
      );
      return;
    } else if (dialogueNumber === 15) {
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
      setIsPathBeingFetched(true);
      const res: number | { distance: number; path: string[] } =
        await fetchPath(map);
      if (typeof res === "number" || !res?.distance || !res?.path) {
        setIsPathBeingFetched(false);
        setDialogueNumber(9.5);
        return;
      } else {
        setPath(res as { distance: number; path: string[] });
        setIsPathBeingFetched(false);
        setDialogueNumber(10.5);
        return;
      }
    }
    fetchPathFromAPI();
  }, [map]);

  useEffect(() => {
    async function fetchMapsFromAPI() {
      const res = await fetchMaps();
      if (res) setMaps(res);
    }
    fetchMapsFromAPI();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {isDrawOpen && (
        <Canvas setIsOpen={setIsDrawOpen} isOpen={isDrawOpen} setMap={setMap} />
      )}
      {isCommunityMapsOpen && (
        <CommunityMaps
          isOpen={isCommunityMapsOpen}
          setIsOpen={setIsCommunityMapsOpen}
          setPath={setPath}
          maps={maps}
        />
      )}
      <Typewriter text={dialogueText} speed={50} setIsTyping={setIsTyping} />
      <div className="flex items-center sm:justify-end justify-center sm:*:!w-fit *:!w-full flex-wrap md:text-lg sm:text-sm space-x-2">
        {isTyping ? null : isPathBeingFetched ? null : dialogueNumber === 7 ? (
          <>
            <label
              htmlFor="mapa"
              className="block cursor-pointer w-fit p-2 my-2 mx-0 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg text-center"
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
              className="block w-fit p-2 my-2 mx-0 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg text-center"
            >
              Narysuj mapę
            </button>
            <button
              onClick={() => {
                setIsCommunityMapsOpen(true);
              }}
              className="block w-fit text-center p-2 my-2 mx-0 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
            >
              Wyszukaj z map użytkowników
            </button>
          </>
        ) : dialogueNumber === 12 ? (
          <>
            <button
              onClick={() => {
                if (map) publishMap(map);
                setDialogueNumber(13);
              }}
              className="block w-fit p-2 my-2 mx-0 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg text-center"
            >
              Jasne!
            </button>
            <button
              onClick={() => {
                setDialogueNumber(13);
              }}
              className="block w-fit p-2 my-2 mx-0 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg text-center"
            >
              Może lepiej nie!
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
              className="block w-fit text-center p-2 my-2 mx-0 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
            >
              {choice.text}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
