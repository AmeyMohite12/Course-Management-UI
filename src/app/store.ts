import { LOGIN, LOGOUT } from "./actions";
export interface IappState {
  loggedIn: boolean;
}

export const INITIAL_STATE: IappState = {
  loggedIn: true,
};

export function rootReducer(state: IappState, action): IappState {
  switch (action.type) {
    case LOGIN:
      return { loggedIn: true };
    case LOGOUT:
      return { loggedIn: false };
  }

  return state;
}
