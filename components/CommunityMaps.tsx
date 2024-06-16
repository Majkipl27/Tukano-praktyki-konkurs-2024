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
        {maps && maps.length > 0 ? (
          maps.map((map) => (
            <div
              key={map.id}
              className="flex items-center justify-between gap-4"
            >
              <img
                src={`data:image/png;base64,${Buffer.from(map.data).toString(
                  "base64"
                )}`}
                className="max-w-72"
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
                className="block w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
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
      </DialogContent>
    </Dialog>
  );
}
