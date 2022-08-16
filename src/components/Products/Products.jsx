import React from 'react';
import Product from './Product';

function Products({ items }) {
  return (
    <div className='row'>
      {items.map((x) => {
        return <Product key={x.id} {...x} />;
      })}
    </div>
  );
}

export default Products;
