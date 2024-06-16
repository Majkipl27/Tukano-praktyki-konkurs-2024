"use client";

import { dialogueNumberAtom } from "@/lib/atoms";
import { Dialog, DialogContent } from "./ui/dialog";
import { useSetAtom } from "jotai";

export function CommunityMaps({
  isOpen,
  setIsOpen,
  setPath,
  maps,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setPath: (path: { distance: number; path: string[] } | null) => void;
  maps: { id: number; data: Buffer; distance: number; path: string }[];
}): JSX.Element {
  const setDialogueNumber = useSetAtom(dialogueNumberAtom);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="flex flex-col gap-4 overflow-y-auto items-center w-full max-h-[500px] px-4 my-4">
          {maps && maps.length > 0 ? (
            maps.map((map) => (
              <div
                key={map.id}
                className="flex items-center justify-between flex-wrap gap-4"
              >
                <img
                  src={`data:image/png;base64,${Buffer.from(map.data).toString(
                    "base64"
                  )}`}
                  className="xl:max-w-96 w-full"
                />
                <button
                  onClick={() => {
                    setPath({
                      distance: map.distance,
                      path: JSON.parse(map.path),
                    });
                    setIsOpen(false);
                    setDialogueNumber(11);
                  }}
                  className="block xl:w-fit h-fit w-full p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
                >
                  Wybierz
                </button>
              </div>
            ))
          ) : (
            <p className="text-xl mt-8 font-poppins font-semibold">
              Nie znaleziono żadnych map użytkowników :C
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
