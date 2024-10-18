import { INCREMENT, DECREMENT } from "../constants";
export const increment = (data: any) => ({ type: INCREMENT, data });
export const decrement = (data: any) => ({ type: DECREMENT, data });
export const incrementAsync = (data: any) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(increment(data));
    }, 1000);
  };
};
