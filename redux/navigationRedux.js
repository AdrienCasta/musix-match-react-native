import AppNavigation from "../navigation/Screens";

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state);
  return newState || state;
};
