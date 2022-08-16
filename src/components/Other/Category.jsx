import React from 'react';
import { NavLink } from 'react-router-dom';

function Category({ id, title, url }) {
  let link = id !== null ? (url ? `${url}${id}` : `/${id}`) : url ? url : '/';

  return (
    <li className='nav-item'>
      <NavLink to={link} className='nav-link'>
        {title}
      </NavLink>
    </li>
  );
}

export default Category;
