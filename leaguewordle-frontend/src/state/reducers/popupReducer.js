const popupReducer = (state = false, action) => {
  switch (action.type) {
    case "help":
      return !state;
    case "won":
      return !state;
    case "lose":
      return !state;
    default:
      return false;
  }
};
export default popupReducer;
