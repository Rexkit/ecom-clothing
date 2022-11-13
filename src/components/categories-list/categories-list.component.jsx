import React from 'react';
import HomeItem from '../home-item/home-item.component';
import { CategoriesContainer } from './categories-list.styles';

const categories = [
  {
    "id": 1,
    "title": "Hats",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
    "route": 'shop/hats'
  },
  {
    "id": 2,
    "title": "Jackets",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
    "route": 'shop/jackets'
  },
  {
    "id": 3,
    "title": "Sneakers",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
    "route": 'shop/sneakers'
  },
  {
    "id": 4,
    "title": "Women",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
    "route": 'shop/womens'
  },
  {
    "id": 5,
    "title": "Men",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
    "route": 'shop/mens'
  }
];

const CategoriesList = () => {
  return (
    <CategoriesContainer>
      {categories.map(category => {
        return (
          <HomeItem key={category.id} category={category} />
        )
      })}
    </CategoriesContainer>
  )
}

export default CategoriesList;