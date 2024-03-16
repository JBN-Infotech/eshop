const currentUser = (state = {}, action) => {
  switch(action.type){
      case "SET_USER":
        localStorage.setItem("counter-app-loggedin", true);
        return {
            ...state,
            user: action.payload,
            loggedIn: true
        }
      case "LOG_OUT":
        return {
            ...state,
            user: {},
            loggedIn: false
        }
      default:
        return state
  }
}

export default currentUser;
