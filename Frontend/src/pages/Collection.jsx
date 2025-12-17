import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';


const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
 
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // Toggle Category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Toggle SubCategory
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Apply Filters
  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        Category.includes(item.category)
      );
    }

    if (SubCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        SubCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price);
        break;

      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price);
        break;

      default:
        return;
    }

    setFilterProducts(fpCopy);
  };

  // ✅ IMPORTANT FIX: initialize when products load
  useEffect(() => {
    if (products.length > 0) {
      setFilterProducts(products);
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [Category, SubCategory, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* FILTER SIDEBAR */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map(cat => (
              <p key={cat} className="flex gap-2">
                <input type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
              <p key={sub} className="flex gap-2">
                <input type="checkbox" value={sub} onChange={toggleSubCategory} />
                {sub}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map(item => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
