import React, { useState, useEffect } from 'react';
import Banner from '../Other/Banner';
import Error from '../Other/Error';
import Loading from '../Other/Loading';
import Products from '../Products/Products';
import Catalog from './Catalog';

function Index() {
  const [topSales, setTopSales] = useState([]);
  const [loadingTopSales, setLoadingTopSales] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTopSales();
  }, []);

  function fetchTopSales() {
    setLoadingTopSales(true);
    setError(null);
    fetch('https://sh-store.herokuapp.com/api/top-sales')
      .then((res) => res.json())
      .then((json) => {
        setLoadingTopSales(false);
        setTopSales(json);
      })
      .catch(() => {
        setLoadingTopSales(false);
        setError(true);
      });
  }

  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <Banner />
          <section className='top-sales'>
            <h2 className='text-center'>Хиты продаж!</h2>
            {loadingTopSales ? (
              <Loading />
            ) : error ? (
              <Error action={fetchTopSales} />
            ) : (
              <Products items={topSales} />
            )}
          </section>
          <Catalog />
        </div>
      </div>
    </main>
  );
}

export default Index;
