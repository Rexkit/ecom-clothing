import React from 'react';
import HomeItem from '../home-item/home-item.component';
import './categories-list.styles.scss';

const CategoriesList = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map(category => {
        return (
          <HomeItem key={category.id} category={category} />
        )
      })}
    </div>
  )
}

export default CategoriesList;