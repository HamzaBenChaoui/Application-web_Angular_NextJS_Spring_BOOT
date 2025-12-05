import Link from 'next/link';
import { EyeIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import './ProductCard.css';

const ProductCard = ({ product, isGridView, likedProducts, toggleLike, handleOpenCheckout, formatPrice }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="product-image-overlay" />
        
        {product.featured && (
          <span className="featured-badge">
            En Vedette
          </span>
        )}
        
        <span className="type-badge">
          {product.type}
        </span>
      </div>
      
      <div className="product-content">
        <div className="product-title-container">
          <h3 className="product-title">
            {product.name}
          </h3>
          <span className="product-price">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <div className="category-badge-container">
          <span className={`category-badge ${
            product.category === 'motorcycle' 
              ? 'category-badge-motorcycle'
              : 'category-badge-bicycle'
          }`}>
            {product.category === 'motorcycle' ? 'moto' : 'vélo'}
          </span>
        </div>

        <div className="specs-grid">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="spec-item">
              <div className="spec-value">{value}</div>
              <div className="spec-key">
                {key === 'engine' ? 'moteur' : 
                 key === 'power' ? 'puissance' : 
                 key === 'weight' ? 'poids' : 
                 key === 'gears' ? 'vitesses' : 
                 key === 'frame' ? 'cadre' : 
                 key === 'suspension' ? 'suspension' : key}
              </div>
            </div>
          ))}
        </div>

        <div className="button-bar">
          <Link href={`/productPage/${product.id}`} className="details-button-container">
            <button className="details-button" aria-label="Voir les détails du produit">
                          <EyeIcon className="h-6 w-6 mx-auto" /> 
               </button>
          </Link>
          
          <button 
            className="pay-button"
            onClick={() => handleOpenCheckout(product)}
            title="Payer maintenant"
            aria-label="Payer maintenant"
          >
            <CreditCardIcon className="w-6 h-6" />
          </button>
          
          <button 
            className="wishlist-button"
            onClick={() => toggleLike(product.id)}
            title="Ajouter aux favoris"
            aria-label="Ajouter aux favoris"
          >
            <svg 
              className={`wishlist-icon ${
                likedProducts.has(product.id) 
                  ? 'wishlist-icon-liked' 
                  : 'wishlist-icon-unliked'
              }`}
              fill={likedProducts.has(product.id) ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
