import { atom } from "jotai";

const dialogueNumberAtom = atom<number>(1);
const isOnPolanaAtom = atom<boolean>(false);

export { dialogueNumberAtom, isOnPolanaAtom };