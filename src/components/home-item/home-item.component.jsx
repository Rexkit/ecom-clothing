import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, HomeItemContainer } from './home-item.styles';

const HomeItem = ({ category }) => {
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
  )
}

export default HomeItem;