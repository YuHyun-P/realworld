import { type Tag } from "~/types";

export type TagState = Tag[];

type TagAction =
  | { type: "ADD"; payload: Tag }
  | { type: "DELETE"; payload: Tag };

export const initialState = [];

export function tagReducer(state: TagState, action: TagAction): TagState {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((tag) => tag !== action.payload);
    default:
      throw new Error("Invalid action type");
  }
}
