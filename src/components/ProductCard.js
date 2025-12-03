import React from 'react';
import './ProductCard.css';

const ProductCard = ({ products, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="product-card-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="card-header">
            <h3 className="card-title">{product.name}</h3>
            <span className="category-badge">{product.category}</span>
          </div>
          
          <div className="card-body">
            <div className="card-price">{formatPrice(product.price)}</div>
            
            {product.description && (
              <p className="card-description">{product.description}</p>
            )}
            
            <div className="card-details">
              <div className="detail-item">
                <span className="detail-label">Stock:</span>
                <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                  {product.stock} units
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Created:</span>
                <span className="detail-value">{formatDate(product.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="card-footer">
            <button
              className="btn btn-success btn-sm"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;

