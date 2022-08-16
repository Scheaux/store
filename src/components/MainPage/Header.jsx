import React from 'react';
import { useContext } from 'react';
import { createRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import headerLogo from '../../img/header-logo.png';
import AppContext from '../Other/AppContext';

function Header() {
  const formRef = createRef();
  const inputRef = createRef();
  const navigate = useNavigate();
  const { setSearchField, cart } = useContext(AppContext);

  function expandSearch() {
    if (inputRef.current.value === '') {
      formRef.current.classList.toggle('invisible');
      formRef.current.querySelector('input').focus();
    } else {
      redirectAndSearch();
    }
  }

  function redirectAndSearch() {
    navigate('/catalog/');
    formRef.current.reset();
    formRef.current.classList.add('invisible');
  }

  function handleChange(evt) {
    setSearchField(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    redirectAndSearch();
  }

  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <Link className='navbar-brand' to='/'>
              <img src={headerLogo} alt='Bosa Noga' />
            </Link>
            <div className='collapase navbar-collapse' id='navbarMain'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <NavLink to='/' className='nav-link'>
                    Главная
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/catalog/' className='nav-link'>
                    Каталог
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/about/' className='nav-link'>
                    О магазине
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/contacts/' className='nav-link'>
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className='header-controls-pics'>
                  <div
                    onClick={expandSearch}
                    data-id='search-expander'
                    className='header-controls-pic header-controls-search'
                  ></div>
                  <Link to='/cart/'>
                    <div className='header-controls-pic header-controls-cart'>
                      {cart?.length !== 0 && (
                        <div className='header-controls-cart-full'>
                          {cart.length}
                        </div>
                      )}
                      <div className='header-controls-cart-menu'></div>
                    </div>
                  </Link>
                </div>
                <form
                  data-id='search-form'
                  className='header-controls-search-form form-inline invisible'
                  ref={formRef}
                  onSubmit={handleSubmit}
                >
                  <input
                    className='form-control'
                    placeholder='Поиск'
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
