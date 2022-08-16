import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Category from '../Other/Category';
import { v4 } from 'uuid';
import AppContext from '../Other/AppContext';
import useFetchItems from '../Other/useFetchItems';
import Loading from '../Other/Loading';
import Error from '../Other/Error';
import Products from '../Products/Products';

function Catalog(props) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { url } = props;
  const offset = useRef(0);
  const [error, setError] = useState(false);

  const fetchItems = useFetchItems();

  const {
    searchField,
    setSearchField,
    items,
    loadBtnVisible,
    setLoadBtnVisible,
  } = useContext(AppContext);

  function fetchCategories() {
    fetch('https://sh-store.herokuapp.com/api/categories')
      .then((res) => res.json())
      .then((json) => setCategories([{ id: null, title: 'Все' }, ...json]))
      .catch(() => {
        setError(true);
      });
  }

  function fetchProducts() {
    setIsLoading(true);
    (async () => {
      const { error } = await fetchItems(offset.current);
      if (error) setError(error);
      setIsLoading(false);
    })();
    setLoadBtnVisible(true);
  }

  function fetchAll() {
    setError(false);
    setIsLoading(true);
    fetchCategories();
    setLoadBtnVisible(true);
    fetchProducts();
  }

  useEffect(() => {
    offset.current = 0;
    fetchAll();
  }, [params.category]);

  function handleClick() {
    offset.current += 6;
    setIsLoading(true);
    (async () => {
      const { error } = await fetchItems(offset.current);
      if (error) setError(error);
      setIsLoading(false);
    })();
  }

  function handleChange(evt) {
    setSearchField(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    offset.current = 0;
    fetchProducts();
  }

  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          {props.children}
          <section className='catalog'>
            <h2 className='text-center'>Каталог</h2>
            {url && (
              <form
                className='catalog-search-form form-inline'
                onSubmit={handleSubmit}
              >
                <input
                  className='form-control'
                  placeholder='Поиск'
                  onChange={handleChange}
                  value={searchField}
                />
              </form>
            )}
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Error action={fetchAll} />
            ) : (
              <>
                <ul className='catalog-categories nav justify-content-center'>
                  {categories.map((x) => {
                    return <Category key={v4()} {...x} url={url} />;
                  })}
                </ul>
                <Products items={items} />
                <div className='text-center'>
                  {loadBtnVisible && (
                    <button
                      className='btn btn-outline-primary'
                      onClick={handleClick}
                    >
                      Загрузить ещё
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Catalog;
