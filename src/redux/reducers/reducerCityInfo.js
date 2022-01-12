let initialState = {
  cityArray: [],
  currentSelectNumberCity: 0,
};
export default function cityInfo(state = initialState, action) {

  switch (action.type) {
    case "ADD_CITY":
      {
        return {
          ...state,
          cityArray: [...state.cityArray, action.newArray],
          currentSelectNumberCity: action.newIndexCity,
        }
      }
      case "ADD_DATA":
      {
        return {
          ...state,
          cityArray:  action.newData,
          currentSelectNumberCity: action.newIndexCity,
        }
      }
    case "CHOOSE_CITY":
      {
        return {
          ...state,
          currentSelectNumberCity: action.newIndexCity,
        }
      }
    case "SWITCH_CITY":
      {
        return {
          ...state,
          cityArray: action.newArray,
          currentSelectNumberCity: action.newIndexCity,
        }
      }
    case "DELETE_CITY":
      {
        return {
          ...state,
          cityArray: action.newArrayCity,
          currentSelectNumberCity: action.newIndexCity,
        }
      }
    default: return state
  }
}