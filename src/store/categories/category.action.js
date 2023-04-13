import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'

import { CATEGORIES_ACTION_TYPES } from "./category.types"

const fetchCategoriesStart = () => {
  return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START}
} 
const fetchCategoriesSuccess = (categoriesArray) => {
  return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArray}
} 
const fetchCategoriesFailed = (error) => {
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




