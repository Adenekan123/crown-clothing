import {
  DirectoryContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const goToCategoryHandler = () => navigate(route);
  return (
    <DirectoryContainer onClick={goToCategoryHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryContainer>
  );
};

export default DirectoryItem;
