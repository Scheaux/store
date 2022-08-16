import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Other/Loading';
import { v4 } from 'uuid';
import AppContext from '../Other/AppContext';
import Error from '../Other/Error';

function ProductById() {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [notAvailable, setNotAvailable] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { setCart } = useContext(AppContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function fetchAll() {
    setIsLoading(true);
    setError(false);
    fetch(`https://sh-store.herokuapp.com/api/items/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
        setIsLoading(false);
        const isAvailable = json.sizes.every((z) => z.avalible === false);
        setNotAvailable(isAvailable);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function selectSize(size) {
    setSelectedSize(size);
  }

  function updateQuantity(amount) {
    let q = quantity;
    if (q + amount >= 1 && q + amount <= 10) {
      setQuantity((prev) => prev + amount);
    }
  }

  function addToCart() {
    if (!selectedSize) return;
    const localCart = JSON.parse(localStorage.cart);

    const cartItem = {
      id: item.id,
      title: item.title,
      size: selectedSize,
      price: item.price,
      quantity,
      uid: v4(),
    };

    const existingItem = localCart.find(
      (x) => x.id === item.id && x.size === selectedSize
    );
    if (existingItem?.size === selectedSize) {
      existingItem.quantity += quantity;
      if (existingItem.quantity > 10) existingItem.quantity = 10;
      else if (existingItem.quantity < 1) existingItem.quantity = 1;
    } else {
      localCart.push(cartItem);
    }

    setCart(localCart);
    navigate('/cart/');
  }

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error action={fetchAll} />
  ) : (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <section className='catalog-item'>
            <h2 className='text-center'>{item.title}</h2>
            <div className='row'>
              <div className='col-5'>
                <img
                  src={item.images[0]}
                  className='img-fluid'
                  alt={item.title}
                />
              </div>
              <div className='col-7'>
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{item.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{item.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{item.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{item.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{item.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{item.reason}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='text-center'>
                  {!notAvailable && (
                    <p>
                      Размеры в наличии:
                      {item.sizes.map((x) => {
                        if (x.avalible)
                          return (
                            <span
                              key={v4()}
                              className={`catalog-item-size ${
                                x.size === selectedSize ? 'selected' : ''
                              }`}
                              onClick={() => selectSize(x.size)}
                            >
                              {x.size}
                            </span>
                          );
                      })}
                    </p>
                  )}
                  {!notAvailable && (
                    <p>
                      Количество:
                      <span className='btn-group btn-group-sm pl-2'>
                        <button
                          className='btn btn-secondary'
                          onClick={() => updateQuantity(-1)}
                        >
                          -
                        </button>
                        <span className='btn btn-outline-primary'>
                          {quantity}
                        </span>
                        <button
                          className='btn btn-secondary'
                          onClick={() => updateQuantity(1)}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  )}
                </div>
                {!notAvailable && (
                  <button
                    className='btn btn-danger btn-block btn-lg'
                    onClick={addToCart}
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductById;
