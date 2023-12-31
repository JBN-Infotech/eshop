const setVisibility = (visibilityObj) => {
  return {
      type: "TOGGLE",
      payload: visibilityObj
  }
}

export const sideBarActions = {
  setVisibility
};
