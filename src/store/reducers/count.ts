import { INCREMENT, DECREMENT } from "../constants";
const initState = 0;
export default function countReducer(state = initState, action: any) {
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return state + data;
    case DECREMENT:
      return state - data;
    default:
      return state;
  }
}
