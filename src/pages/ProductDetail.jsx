import { useEffect, useState } from 'react';
import { Minus, Plus, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import { fallbackProducts } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

const price = (value) => `৳ ${Number(value).toLocaleString('en-US')}`;

export default function ProductDetail({ onProducts }) {
  const { id } = useParams(); const { addItem } = useCart();
  const [product, setProduct] = useState(() => fallbackProducts.find((item) => item._id === id));
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1); const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => { let active = true; setImageIndex(0); api.get(`/products/${id}`).then(({ data }) => { if (active) setProduct(data); }).catch(() => { if (active) setProduct(fallbackProducts.find((item) => item._id === id)); }); return () => { active = false; }; }, [id]);
  // Related products come from the live catalogue, not demo data. onProducts feeds
  // the navbar search with real items when a product page is opened directly.
  useEffect(() => {
    if (!product?.category) return undefined;
    let active = true;
    api.get('/products', { params: { category: product.category, limit: 6 } })
      .then(({ data }) => { if (!active) return; const list = data.products || []; setRelated(list.filter((item) => item._id !== product._id).slice(0, 4)); if (list.length) onProducts?.(list); })
      .catch(() => {});
    return () => { active = false; };
  }, [product?.category, product?._id, onProducts]);
  if (!product) return <main className="page-container section-space text-center"><h1 className="section-heading">পণ্যটি পাওয়া যায়নি</h1><Link className="btn-primary mt-4" to="/shop">শপে ফিরে যান</Link></main>;
  const images = product.images?.length ? product.images : ['https://placehold.co/600x520/f0f0f0/333?text=Product'];
  const relatedList = related.length ? related : fallbackProducts.filter((item) => item.category === product.category && item._id !== product._id).slice(0, 4);
  return <main className="page-container section-space"><div className="grid gap-9 lg:grid-cols-2"><div><div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-card"><img className="h-full w-full object-cover" src={images[imageIndex]} alt={product.name} /></div><div className="mt-3 flex gap-2">{images.map((image, index) => <button className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${index === imageIndex ? 'border-primary' : 'border-transparent'}`} key={image} onClick={() => setImageIndex(index)}><img className="h-full w-full object-cover" src={image} alt="" /></button>)}</div></div><div><p className="font-semibold text-primary">{product.brand}</p><h1 className="mt-1 text-3xl font-bold leading-tight">{product.banglaName || product.name}</h1><p className="mt-1 text-zinc-500">{product.name}</p><div className="mt-3 flex items-center gap-1 text-amber-500"><Star fill="currentColor" size={18} /><span className="font-semibold">{Number(product.rating?.average || 5).toFixed(1)}</span><span className="text-sm text-zinc-500">({product.rating?.count || 0} রিভিউ)</span></div><div className="mt-4 flex items-baseline gap-3"><span className="text-3xl font-bold text-primary">{price(product.price)}</span>{product.originalPrice > product.price && <del className="text-zinc-400">{price(product.originalPrice)}</del>}</div><p className="mt-5 leading-7 text-zinc-600">{product.description}</p><p className={`mt-4 font-semibold ${product.stock ? 'text-green-700' : 'text-red-600'}`}>{product.stock ? `স্টকে আছে (${product.stock}টি)` : 'স্টক শেষ'}</p><div className="mt-6 flex flex-wrap gap-3"><div className="flex items-center rounded-lg border bg-white"><button className="p-3 text-primary" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button><span className="w-10 text-center font-bold">{quantity}</span><button className="p-3 text-primary" onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))}><Plus size={18} /></button></div><button disabled={!product.stock} onClick={() => addItem(product, quantity)} className="btn-primary flex-1">কার্টে যোগ করুন</button></div></div></div><section className="mt-16"><h2 className="section-heading">সম্পর্কিত পণ্য</h2><div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">{relatedList.map((item) => <ProductCard key={item._id} product={item} />)}</div></section></main>;
}
