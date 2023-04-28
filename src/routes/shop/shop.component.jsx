import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../../routes/categories-preview/categories-preview.components";
import Category from "../../routes/category/category.component";
import { fetchCategoriesStart } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
