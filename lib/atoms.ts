import { atom } from "jotai";

const dialogueNumberAtom = atom<number>(7);
const isOnPolanaAtom = atom<boolean>(false);

export { dialogueNumberAtom, isOnPolanaAtom };