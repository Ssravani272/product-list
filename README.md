# Product List Management Application

A React-based product management system with list/card views, search, add/edit functionality, and pagination.

## Features

1. **Product List Display**
   - List view (table format)
   - Card view (grid format)
   - Toggle between views

2. **Search with Debounce**
   - Real-time search by product name
   - 500ms debounce delay

3. **Add & Edit Product**
   - Form with validation:
     - Name (required)
     - Price (number, required)
     - Category (required)
     - Stock (number)
     - Description (optional)
   - In-memory state management

4. **Pagination**
   - Navigate through products
   - 6 items per page

## Installation

1. Clone the git repo

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Technologies Used

- React 18.2.0
- CSS3 (Modern styling with gradients and animations)

## Usage

- **Search**: Type in the search bar to filter products by name (500ms debounce)
- **Toggle View**: Click "List" or "Grid" buttons to switch between views
- **Add Product**: Click "+ Add Product" button to create a new product
- **Edit Product**: Click "Edit" button on any product
- **Delete Product**: Click "Delete" button on any product (with confirmation)
- **Pagination**: Use pagination controls at the bottom to navigate through pages

