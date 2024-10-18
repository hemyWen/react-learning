import { legacy_createStore } from "redux";
const initialState = {
  counter: 0,
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "ADD_NUMBER":
      return { ...state, counter: state.counter + action.number };
    default:
      return state;
  }
};
const store = legacy_createStore(reducer);
export default store;
// store.subscribe(() => {
//   console.log(store.getState());
// });
// // 修改store中的state
// store.dispatch({
//   type: "INCREMENT",
// });
// // console.log(store.getState());

// store.dispatch({
//   type: "DECREMENT",
// });
// // console.log(store.getState());

// store.dispatch({
//   type: "ADD_NUMBER",
//   number: 5,
// });
