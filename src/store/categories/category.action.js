import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'

import { CATEGORIES_ACTION_TYPES } from "./category.types"

export const fetchCategoriesStart = () => {
  return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START}
} 
export const fetchCategoriesSuccess = (categoriesArray) => {
  return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArray}
} 
export const fetchCategoriesFailed = (error) => {
  return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:error}
} 


export const fetchcategoriesAsync = () => async (dispatch) =>{
  dispatch(fetchCategoriesStart())
  try{
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray))
  }catch(error){
    dispatch(fetchCategoriesFailed(error))
  }
}




