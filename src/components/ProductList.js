import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onEdit, onDelete }) => {
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
    <div className="product-list-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-name">{product.name}</td>
              <td className="product-price">{formatPrice(product.price)}</td>
              <td
                className="category-badge">{product.category}
              </td>
              <td>
                <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                  {product.stock}
                </span>
              </td>
              <td className="product-description">
                {product.description || '-'}
              </td>
              <td className="product-date">{formatDate(product.createdAt)}</td>
              <td className="action-buttons">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => onEdit(product)}
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(product.id)}
                  title="Delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

