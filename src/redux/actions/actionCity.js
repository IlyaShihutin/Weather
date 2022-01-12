export const addCity = (newArray, newIndexCity) => ({
    type: "ADD_CITY",
    newArray,
    newIndexCity,
})
export const switchLastCity = (newArray,newIndexCity) => ({
    type: "SWITCH_CITY",
    newArray,
    newIndexCity,
})
export const deleteCurCity = (newArrayCity, newIndexCity) => ({
    type: "DELETE_CITY",
    newArrayCity,
    newIndexCity,
})
export const chooseSelectCity = (newIndexCity) => ({
    type: "CHOOSE_CITY",
    newIndexCity
})  
export const addAllCity = (newData, newIndexCity) => ({
    type: "ADD_DATA",
    newData,
    newIndexCity,
})