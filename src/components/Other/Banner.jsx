import React from 'react';
import banner from '../../img/banner.jpg';

function Banner() {
  return (
    <div className='col'>
      <div className='banner'>
        <img src={banner} className='img-fluid' alt='К весне готовы!' />
        <h2 className='banner-header'>К весне готовы!</h2>
      </div>
    </div>
  );
}

export default Banner;
