import { createStore } from "redux";
import produce from "immer";

const initialState = {
  auth: false,
  userId: "",
};

export const loggout = () => ({ type: "loggout" });

export const login = (userId) => ({
  type: "login",
  payload: { userId: userId },
});

function reducer(state = initialState, action) {
  if (action.type === "loggout") {
    return produce(state, (draft) => {
   
      draft.auth = false;
      draft.userId = "";
    });
  }

  if (action.type === "login") {
    const userId = action.payload.userId;
    

    return produce(state, (draft) => {
    
      draft.userId = userId;
      draft.auth = true;
    });
  }

  return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});
