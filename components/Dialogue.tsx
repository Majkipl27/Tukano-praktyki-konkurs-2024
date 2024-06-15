"use client";

import { dialogueNumberAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { dialogues } from "@/lib/dialogues";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTypewriter } from "@/lib/useTypewriter";

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
  const [dialogueText, setDialogueText] = useState<string>("");
  const [hasChosenOption, setHasChosenOption] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!hasChosenOption) {
      setDialogueText("");
    }
    setDialogueText(dialogues[dialogueNumber].text);
    setHasChosenOption(false);
  }, [dialogueNumber, hasChosenOption]);

  useEffect(() => {
    console.log(isTyping)
  }, [isTyping])

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Typewriter text={dialogueText} speed={50} setIsTyping={setIsTyping} />
      <div className="flex items-center justify-end gap-4">
        {isTyping ? null : dialogues[dialogueNumber].options.map((choice, index) => (
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
        ))}
      </div>
    </div>
  );
}
