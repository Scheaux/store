import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import AppContext from '../Other/AppContext';
import Banner from '../Other/Banner';
import Loading from '../Other/Loading';
import Success from '../Other/Success';
import Error from '../Other/Error';

function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const totalPrice = cart.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);
  const [agreement, setAgreement] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function fetchOrder() {
    setError(false);
    setIsLoading(true);
    const items = cart.map((x) => {
      return {
        id: x.id,
        price: x.price,
        count: x.quantity,
      };
    });

    const form = {
      owner: { phone, address },
      items,
    };

    if (agreement === true) {
      setIsLoading(true);
      fetch('https://sh-store.herokuapp.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          if (res.ok) {
            setCart([]);
            setSuccess(true);
            setPhone('');
            setAddress('');
          }
          setIsLoading(false);
        })
        .catch(() => {
          setError(true);
        });
    }
  }

  function removeHandler(uid) {
    const filtered = cart.filter((x) => x.uid !== uid);
    setCart(filtered);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (agreement === true) {
      fetchOrder();
    }
  }

  function changeAgreement(evt) {
    setAgreement(evt.target.checked);
  }

  function changePhone(evt) {
    setPhone(evt.target.value);
  }

  function changeAddress(evt) {
    setAddress(evt.target.value);
  }

  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <Banner />
          <section className='cart'>
            <h2 className='text-center'>Корзина</h2>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Название</th>
                  <th scope='col'>Размер</th>
                  <th scope='col'>Кол-во</th>
                  <th scope='col'>Стоимость</th>
                  <th scope='col'>Итого</th>
                  <th scope='col'>Действия</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((x) => {
                  return (
                    <tr key={v4()}>
                      <td scope='row'>{x.id}</td>
                      <td>
                        <a href='/products/1.html'>{x.title}</a>
                      </td>
                      <td>{x.size}</td>
                      <td>{x.quantity}</td>
                      <td>{x.price} руб.</td>
                      <td>{x.price * x.quantity} руб.</td>
                      <td>
                        <button
                          className='btn btn-outline-danger btn-sm'
                          onClick={() => removeHandler(x.uid)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan='5' className='text-right'>
                    Общая стоимость
                  </td>
                  <td>{totalPrice} руб.</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className='order'>
            <h2 className='text-center'>Оформить заказ</h2>
            <div className='card'>
              <form className='card-body' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='phone'>Телефон</label>
                  <input
                    className='form-control'
                    id='phone'
                    placeholder='Ваш телефон'
                    onChange={changePhone}
                    value={phone}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='address'>Адрес доставки</label>
                  <input
                    className='form-control'
                    id='address'
                    placeholder='Адрес доставки'
                    onChange={changeAddress}
                    value={address}
                  />
                </div>
                <div className='form-group form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='agreement'
                    onChange={changeAgreement}
                    value={agreement}
                  />
                  <label className='form-check-label' htmlFor='agreement'>
                    Согласен с правилами доставки
                  </label>
                </div>
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  <Error action={fetchOrder} />
                ) : success ? (
                  <Success />
                ) : (
                  <button type='submit' className='btn btn-outline-secondary'>
                    Оформить
                  </button>
                )}
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Cart;
