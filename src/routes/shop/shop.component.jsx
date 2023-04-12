import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../../routes/categories-preview/categories-preview.components";
import Category from "../../routes/category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {setCategories} from '../../store/categories/category.action';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getGategoriesMap = async () => {
      const categoiesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoiesArray));
    };
    getGategoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
