import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/MainPage/About';
import Cart from './components/MainPage/Cart';
import Catalog from './components/MainPage/Catalog';
import Contacts from './components/MainPage/Contacts';
import Footer from './components/MainPage/Footer';
import Header from './components/MainPage/Header';
import Index from './components/MainPage/Index';
import P404 from './components/MainPage/P404';
import Banner from './components/Other/Banner';
import AppContext from './components/Other/AppContext';
import ProductById from './components/Products/ProductById';

function App() {
  if (!localStorage.cart) localStorage.cart = JSON.stringify([]);
  const CatalogWithBanner = (
    <Catalog url='/catalog/'>
      <Banner />
    </Catalog>
  );

  const [searchField, setSearchField] = useState('');
  const [items, setItems] = useState([]);
  const [loadBtnVisible, setLoadBtnVisible] = useState(true);
  const [cart, setCart] = useState(JSON.parse(localStorage.cart));
  const context = {
    searchField,
    setSearchField,
    items,
    setItems,
    loadBtnVisible,
    setLoadBtnVisible,
    cart,
    setCart,
  };

  useEffect(() => {
    localStorage.cart = JSON.stringify(cart);
  }, [cart]);

  return (
    <AppContext.Provider value={context}>
      <BrowserRouter basename='store'>
        <Header />
        <Routes>
          <Route path='/'>
            <Route path='' element={<Index />} />
            <Route path=':category' element={<Index />} />
          </Route>
          <Route path='/catalog/'>
            <Route path='' element={CatalogWithBanner} />
            <Route path=':category' element={CatalogWithBanner} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:id' element={<ProductById />} />
          <Route path='*' element={<P404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
