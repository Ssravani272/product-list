import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import Pagination from './components/Pagination';
import { initialProducts } from './data/products';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, products]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      isActive: true,
      tags: []
    };
    setProducts([...products, newProduct]);
    setIsFormOpen(false);
  };

  const handleEditProduct = (productData) => {
    setProducts(products.map(p => 
      p.id === editingProduct.id ? { ...p, ...productData } : p
    ));
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Management System</h1>
      </header>
      
      <main className="app-main">
        <div className="controls-section">
          <div className="controls-left">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setIsFormOpen(true)}
          >
            + Add Product
          </button>
        </div>

        {isFormOpen && (
          <ProductForm
            product={editingProduct}
            onSave={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={handleFormClose}
          />
        )}

        <div className="products-section">
          {currentProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products found. {searchTerm && 'Try a different search term.'}</p>
            </div>
          ) : (
            <>
              {viewMode === 'list' ? (
                <ProductList
                  products={currentProducts}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteProduct}
                />
              ) : (
                <ProductCard
                  products={currentProducts}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteProduct}
                />
              )}
            </>
          )}
        </div>

        {filteredProducts.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}

export default App;

