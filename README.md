
# Luxe Performance Store

![Luxe Performance Store](https://picsum.photos/id/431/1200/630)

## Overview

**Luxe Performance Store** is a high-performance, modern e-commerce storefront designed to showcase a seamless and dynamic shopping experience. Built with a powerful stack including **React 18, TypeScript, and Tailwind CSS**, this project serves as a sophisticated template for a custom WooCommerce store. It prioritizes a lightning-fast UI, real-time product filtering, and a suite of professional features that rival top-tier online retailers.

The application is fully responsive and focuses on delivering an exceptional user experience, from product discovery to a frictionless checkout process.

---

## ✨ Key Features

- **Dynamic Product Catalog:** A fully-featured shop page with real-time, client-side filtering and sorting.
  - **URL-Driven State:** Filters for search, category, price, and sorting are persisted in the URL, allowing for shareable links.
  - **Instant Search:** A global search bar in the header provides immediate access to products.
- **Advanced Product Detail Pages:** Rich product pages with:
  - An interactive image gallery with variant thumbnails.
  - Dynamic price and SKU updates based on selected product options (color, size).
  - Tabbed content for descriptions, specifications, and customer reviews.
- **Sophisticated State Management:** Global state is managed cleanly using React Context API.
  - **`CartContext`:** Manages all shopping cart logic.
  - **`WishlistContext`:** Handles wishlist functionality with `localStorage` persistence.
  - **`UIContext`:** Controls global UI states, like the cart drawer visibility.
- **Interactive Shopping Cart:**
  - A slide-out **Cart Drawer** for quick access without leaving the current page.
  - A full `/cart` page for detailed order review.
- **Persistent Wishlist:** Users can save their favorite items to a wishlist that persists across browser sessions.
- **Professional UI/UX:**
  - **Fluid Animations:** Smooth page transitions and micro-interactions powered by `framer-motion`.
  - **Skeleton Loaders:** An improved perceived performance with skeleton loaders while products are being fetched.
  - **Toast Notifications:** Non-intrusive feedback for user actions using `react-hot-toast`.
  - **Modern Icons:** A clean and consistent look with the `lucide-react` icon library.
- **Robust & Scalable Architecture:**
  - **TypeScript:** Fully typed codebase for enhanced developer experience and fewer runtime errors.
  - **Component-Based:** Built with reusable, modular components.
  - **Responsive Design:** A mobile-first approach ensures a flawless experience on all devices.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **UI Feedback:** React Hot Toast
- **Icons:** Lucide React

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/luxe-performance-store.git
    cd luxe-performance-store
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

The application will be available at `http://localhost:3000`.

---

## 📂 Project Structure

The project is organized with a focus on scalability and maintainability.

```
/
├── public/               # Static assets and index.html
└── src/
    ├── components/       # Reusable UI components (ProductCard, Header, etc.)
    ├── context/          # Global React Context providers (Cart, Wishlist, UI)
    ├── data/             # Mock data for products
    ├── hooks/            # Custom hooks (e.g., useProducts)
    ├── pages/            # Top-level page components for routing
    ├── App.tsx           # Main app component with router setup
    ├── index.tsx         # Application entry point
    └── types.ts          # Shared TypeScript type definitions
```

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
