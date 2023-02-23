import { type Tag } from "~/types";

type TagState = Tag[];

type TagAction =
  | { type: "SET"; payload: Tag[] }
  | { type: "ADD"; payload: Tag }
  | { type: "DELETE"; payload: Tag };

export const initialState = [];

export function tagReducer(state: TagState, action: TagAction): TagState {
  switch (action.type) {
    case "SET":
      return [...action.payload];
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((tag) => tag !== action.payload);
    default:
      throw new Error("Invalid action type");
  }
}
