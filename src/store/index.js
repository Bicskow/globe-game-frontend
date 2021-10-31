import { createStore } from "redux";

const gameReducer = (state = { nickname: "" }, action) => {
  if (action.type === "setNickname") {
    return { nickname: "dummy" };
  }
  return state;
};

const store = createStore(gameReducer);

export default store;
