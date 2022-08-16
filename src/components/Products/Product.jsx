import React from 'react';
import { Link } from 'react-router-dom';

function Product(props) {
  const { price, title, images, id } = props;

  return (
    <div className='col-4'>
      <div className='card catalog-item-card'>
        <img src={images[0]} className='card-img-top img-fluid' alt={title} />
        <div className='card-body'>
          <div className='card-text' title={title}>
            {title}
          </div>
          <p className='card-text'>{price} руб.</p>
          <Link to={`/products/${id}`} className='btn btn-outline-primary'>
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
