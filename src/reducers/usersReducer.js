const usersReducer = (state = [], action) => {
  if (action != null && action.type === "ADD_USER_CONSENT") {
    if (action.users != null && action.users.length > 0) { // bulk users add
      return [...state, ...action.users];
    }
    // add single user
    return [...state, action.user];
  }

  return state;
};

export default usersReducer;
