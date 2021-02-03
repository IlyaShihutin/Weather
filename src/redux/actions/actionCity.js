export const AddCity = (newArray, newIndexCity) => ({
    type: "ADD_CITY",
    newArray,
    newIndexCity,
})
export const SwitchLastCity = (newArray,newIndexCity) => ({
    type: "SWITCH_CITY",
    newArray,
    newIndexCity,
})
export const DeleteCity = (newArrayCity, newIndexCity) => ({
    type: "DELETE_CITY",
    newArrayCity,
    newIndexCity,
})
export const ChooseCity = (newIndexCity) => ({
    type: "CHOOSE_CITY",
    newIndexCity
})  
export const AddAllCity = (newData, newIndexCity) => ({
    type: "ADD_DATA",
    newData,
    newIndexCity,
})