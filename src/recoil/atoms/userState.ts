import { atom } from "recoil";
import { type User } from "~/types";

const userAtom = atom<User | null>({ key: "user", default: null });

export default userAtom;
