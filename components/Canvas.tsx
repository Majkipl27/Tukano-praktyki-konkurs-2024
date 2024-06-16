"use client";

import { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { Dialog, DialogContent } from "./ui/dialog";

export default function Canvas({
  isOpen,
  setIsOpen,
  setMap,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMap: (map: File) => void;
}) {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );
  const firstCanvas = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clear = () => {
    firstCanvas.current.clear();
  };
  const undo = () => {
    firstCanvas.current.undo();
  };

  function dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.split(",")[1]);

    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const save = () => {
    const dataURL = firstCanvas.current.getDataURL();
    const blob = dataURItoBlob(dataURL);
    const file = new File([blob], "fileName.jpg", {
      type: "image/png",
    });

    setMap(file);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <p>Disclaimer: Gemini AI może nie analizować rysunku poprawnie</p>
        <p>Disclaimer 2: Na telefonie nie wygodnie się rysuje</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={clear}
            className="block w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
          >
            Wyczyść
          </button>
          <button
            onClick={undo}
            className="block w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
          >
            Cofnij
          </button>
          <button
            onClick={save}
            className="block w-fit p-2 my-2 bg-orange-700 hover:bg-orange-600 transition-colors text-white rounded-lg"
          >
            Zapisz
          </button>
        </div>
        <CanvasDraw
          canvasWidth={viewportWidth * 0.8}
          canvasHeight={viewportHeight * 0.6}
          hideGrid={true}
          brushRadius={1}
          enablePanAndZoom={true}
          ref={firstCanvas}
          style={{
            borderRadius: "32px",
            border: "1px solid  black",
            margin: "auto",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
