const usersReducer = (state = [], action) => {
  if (action != null && action.type === "ADD_USER_CONSENT") { // add single user
    return [...state, { ...action.user, id: state.length + 1 }];
  }

  if (action != null && action.type === "ADD_USERS_CONSENT") { // add bulk users
    const usersNormalized = action.users.map(
      (user, index) => ({ ...user, id: state.length + 1 + index }),
    );
    return [...state, ...usersNormalized];
  }

  return state;
};

export default usersReducer;
