const sideBar = (state = {visible: false}, action) => {
  switch(action.type){
      case "TOGGLE":
        return {
            ...state,
            visible: action.payload,
        }
      default:
        return state
  }
}

export default sideBar;
