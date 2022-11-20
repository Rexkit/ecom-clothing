import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryItem } from '../../store/categories/category.types';
import { CategoryHomeItem } from '../categories-list/categories-list.component';
import { BackgroundImage, Body, HomeItemContainer } from './home-item.styles';

type HomeItemProps = {
  category: CategoryHomeItem;
};

const HomeItem: FC<HomeItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const navigateHandler = () => navigate(route);

  return (
    <HomeItemContainer onClick={navigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </HomeItemContainer>
  );
};

export default HomeItem;
