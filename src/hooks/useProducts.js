import { useEffect, useState } from 'react';
import api from '../api/client.js';
import { fallbackProducts } from '../data/products.js';

export function useProducts(params = {}) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: fallbackProducts.length });
  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get('/products', { params }).then(({ data }) => {
      if (active) { setProducts(Array.isArray(data.products) ? data.products : []); setMeta(data); }
    }).catch(() => { if (active) { setProducts(fallbackProducts); setMeta({ page: 1, pages: 1, total: fallbackProducts.length }); } }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [JSON.stringify(params)]);
  return { products, loading, meta };
}
