import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const price = (value) => `৳ ${Number(value).toLocaleString('en-US')}`;

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const name = language === 'bn' ? product.banglaName || product.name : product.name;

  return (
    <article className="product-card group">
      {/* Image area */}
      <Link to={`/product/${product._id}`} className="product-card-image">
        <img
          src={product.images?.[0] || 'https://placehold.co/600x600/f3f1f9/666?text=Product'}
          alt={name}
        />
        {product.discount > 0 && (
          <span className="product-card-discount">-{product.discount}%</span>
        )}
        <button
          type="button"
          className="product-card-wishlist"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
      </Link>

      {/* Body */}
      <div className="product-card-body">
        <span className="product-card-brand">{product.brand}</span>
        <Link to={`/product/${product._id}`} className="product-card-title">
          {name}
        </Link>
        <div className="product-card-rating">
          <Star size={14} fill="currentColor" />
          <span className="font-semibold text-zinc-700">{Number(product.rating?.average || 5).toFixed(1)}</span>
          <span>({product.rating?.count || 0})</span>
        </div>
        <div className="product-card-price">
          <span className="product-card-price-current">{price(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-card-price-original">{price(product.originalPrice)}</span>
          )}
        </div>
        <button onClick={() => addItem(product)} className="product-add-btn">
          <ShoppingBag size={16} /> {t('addToCart')}
        </button>
      </div>
    </article>
  );
}
