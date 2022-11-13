import React from 'react';
import './home-item.styles.scss';

const HomeItem = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <div className="home-item-container">
      <div className="background-image" style={{
        background: `url(${imageUrl})`
      }} />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}

export default HomeItem;