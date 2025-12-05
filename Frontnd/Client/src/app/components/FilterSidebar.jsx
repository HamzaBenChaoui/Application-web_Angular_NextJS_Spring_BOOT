import './FilterSidebar.css';

const FilterSidebar = ({
  filters,
  handleFilterChange,
  searchTerm,
  setSearchTerm,
  getTypeOptions,
  minPrice,
  defaultMaxPrice,
  handlePriceRangeChange,
  formatPrice,
}) => {
  return (
    <div className="filter-sidebar">
      {/* Recherche */}
      <div className="glass-card">
        <h3 className="filter-title">Recherche</h3>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Rechercher des produits"
          />
          <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      {/* Filtre Catégorie */}
      <div className="glass-card">
        <h3 className="filter-title">Catégorie</h3>
        <div className="space-y-2">
          {['all', 'motorcycle', 'bicycle'].map((category) => (
            <label key={category} className="filter-option-label">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-option-input"
                aria-label={`Filtrer par catégorie ${category}`}
              />
              <span className="filter-option-text">
                {category === 'all' ? 'Toutes les catégories' : 
                 category === 'motorcycle' ? 'motos' : 'vélos'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtre Type */}
      <div className="glass-card">
        <h3 className="filter-title">Type</h3>
        <div className="space-y-2">
          {getTypeOptions().map((type) => (
            <label key={type} className="filter-option-label">
              <input
                type="radio"
                name="type"
                value={type}
                checked={filters.type === type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-option-input"
                aria-label={`Filtrer par type ${type}`}
              />
              <span className="filter-option-text">
                {type === 'All' ? 'Tous' : 
                 type === 'sport' ? 'sport' :
                 type === 'cruiser' ? 'cruiser' :
                 type === 'naked' ? 'naked' :
                 type === 'adventure' ? 'aventure' :
                 type === 'road' ? 'route' :
                 type === 'mountain' ? 'montagne' :
                 type === 'endurance' ? 'endurance' :
                 type === 'gravel' ? 'gravel' : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Curseur de Plage de Prix */}
      <div className="glass-card">
        <h3 className="filter-title">Plage de prix</h3>
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={defaultMaxPrice}
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
        />
        <div className="price-range-slider-container">
          <span className="price-range-slider-label">
            Jusqu'à {formatPrice(filters.priceRange)}
          </span>
        </div>
      </div>

      {/* Trier par */}
      <div className="glass-card">
        <h3 className="filter-title">Trier par</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="sort-by-select"
          aria-label="Trier les produits"
        >
          <option value="featured">En vedette</option>
          <option value="price-low">Prix : Croissant</option>
          <option value="price-high">Prix : Décroissant</option>
          <option value="name">Nom : A à Z</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
