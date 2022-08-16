import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from './AppContext';

function useFetchItems() {
  const { searchField, setItems, setLoadBtnVisible } = useContext(AppContext);
  const params = useParams();

  return async function fetchItems(offset = 0) {
    const q = new URLSearchParams({ q: searchField });
    const c = new URLSearchParams({ categoryId: params.category });
    const off = new URLSearchParams({ offset });
    let url = `https://sh-store.herokuapp.com/api/items?${off}`;
    if (searchField !== '') url += `&${q}`;
    if (params.category) url += `&${c}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (offset >= 6) await setItems((prev) => [...prev, ...json]);
      else await setItems(json);
      if (json.length < 6) {
        await setLoadBtnVisible(false);
      }
    } catch (e) {
      return { error: true };
    }
    return { error: false };
  };
}

export default useFetchItems;
