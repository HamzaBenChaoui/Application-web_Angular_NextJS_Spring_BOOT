import ProductCard from './ProductCard';

const ProductGrid = ({ products, isGridView, likedProducts, toggleLike, handleOpenCheckout, formatPrice }) => {
  return (
    <div className={`grid gap-6 ${
      isGridView 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isGridView={isGridView}
          likedProducts={likedProducts}
          toggleLike={toggleLike}
          handleOpenCheckout={handleOpenCheckout}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
