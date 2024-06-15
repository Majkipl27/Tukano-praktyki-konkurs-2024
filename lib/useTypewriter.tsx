import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

export const useTypewriter = (
  text: string,
  speed = 50,
  setIsTyping: Dispatch<SetStateAction<boolean>>
) => {
  const [displayText, setDisplayText] = useState("");
  const isTypingRef = useRef(false);

  useEffect(() => {
    let timeoutId: number | null = null;

    const typeWriter = async () => {
      isTypingRef.current = true;
      setDisplayText("");

      try {
        for (let i = 0; i < text.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, speed));
          setDisplayText((prevText) => prevText + text.charAt(i));
        }
      } finally {
        isTypingRef.current = false;
        setIsTyping(false);
      }
    };

    if (!isTypingRef.current) {
      setIsTyping(true);
      typeWriter();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed]);

  return displayText;
};
