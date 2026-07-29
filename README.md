# Luxe — High-Performance Storefront

Storefront front-end for a custom WooCommerce build: product catalog with URL-driven filtering (shareable filter states), variant-aware product pages, slide-out cart drawer, wishlist with localStorage persistence, and a multi-step checkout. React 19 + TypeScript + React Router 7 + Framer Motion + Tailwind.

Live: [shop.abemt.dev](https://shop.abemt.dev)

## Architecture notes

- State via Context: `CartContext`, `WishlistContext`, `UIContext` — no state library needed at this scale.
- Filters/search/sort persist in the URL, so any product view is linkable.
- Skeleton loaders + toast feedback keep perceived performance high.
- In the production WooCommerce version, `data/mockData.ts` is replaced by the Store API with a custom PHP checkout layer.

## Run

```bash
npm install
npm run dev
```
