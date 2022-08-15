// import { useSelector, useDispatch, createStore, applyMiddleware } from "react-redux";
// import logger from 'redux-logger'
// import { combineReducers } from "redux";
// const helpPopup = 'helpPopup';
// const wonPopup = 'wonPopup';
// const losePopup ='losePopup';

// function setHelpPopup () {
//   return {
//     type: helpPopup,
//     info: 'first action',
//   }
// }

// function setWonPopup () {
//   return {
//     type: wonPopup,
//     info: '2nd action',
//   }
// }

// const intialPopupState = {
//   isWon: false;
//   isLost: false;
//   buttonPopup: true;
// }

// const popupReducer = (state = initialPopupState, action) => {
//   switch (action.type) {
//     case "helpPopup":
//       return !state;
//     case "wonPopup":
//       return !state;
//     case "losePopup":
//       return !state;
//     default:
//       return false;
//   }
// };

// const rootReducer = combineReducers({
//   popup: popupReducer,
// })
// const store =  createStore(rootReducer,
//   applyMiddleware(logger))
// console.log('initial state', store.getState());
// store.subscribe(()=> console.log('Updated state', store.getState()))
// store.dispatch(setHelpPopup())
// unsubscribe()

// export const help = () => {
//   return {
//     type: "help",
//   };
// };

// export const won = () => {
//   return {
//     type: "won",
//   };
// };

// export const lose = () => {
//   return {
//     type: "lose",
//   };
// };
