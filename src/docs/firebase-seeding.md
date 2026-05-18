# Firebase Seeding Guide

## What is seed data?

Seed data populates your Firestore database with realistic starter content so the admin dashboard, product listings and order history have meaningful data from day one. It is not auto-generated — you run it once, manually.

## Seed does NOT run automatically

The seed service checks `import.meta.env.DEV` at runtime. If you are in production and call a seed function without passing `allowProductionSeed: true`, it throws an error and exits immediately. The app startup code never calls any seed function.

## Where are the seed functions?

| File | Purpose |
|---|---|
| `src/data/seed/seedCategories.ts` | 8 categories |
| `src/data/seed/seedProducts.ts` | 16 products |
| `src/data/seed/seedUsers.ts` | 2 demo user profiles |
| `src/data/seed/seedOrders.ts` | 6 sample orders |
| `src/data/seed/seedReviews.ts` | 8 product reviews |
| `src/data/seed/seedAdminMetrics.ts` | Dashboard chart data |
| `src/data/seed/seedSettings.ts` | Store settings |
| `src/services/firebase/seedService.ts` | Firestore write functions |

## How to run seedAll manually (development)

Open your browser's DevTools console while the Vite dev server is running, then import and call:

```ts
import { seedAll } from './src/services/firebase/seedService'

seedAll().then(result => console.log(result))
// Expected: { success: true, data: { categories: 8, products: 16, ... } }
```

Or call individual steps:

```ts
import { seedCategoriesService, seedProductsService } from './src/services/firebase/seedService'

await seedCategoriesService()
await seedProductsService()
```

## Clearing seed data (dev only)

```ts
import { clearSeedData } from './src/services/firebase/seedService'

clearSeedData().then(r => console.log(r))
```

**Warning:** `clearSeedData` deletes all documents that match the seed IDs. It will not touch documents you created manually unless they share the same IDs.

## Production safety

- Seed functions throw if `import.meta.env.DEV` is falsy unless you pass `{ allowProductionSeed: true }`.
- Never import seed functions in production UI code.
- Never auto-trigger seed on app load.

## Firestore collection structure

```
/categories/{categoryId}        — Category documents
/products/{productId}           — FirestoreProduct documents
/users/{userId}                 — UserProfile documents (Firestore only — not Auth)
/orders/{orderId}               — Full Order documents
/reviews/{reviewId}             — Product reviews
/carts/{userId}                 — UserCart (one doc per user)
/wishlists/{userId}             — UserWishlist (one doc per user)
/settings/store                 — StoreSettings singleton
/adminMetrics/overview          — DashboardMetric snapshot
/adminMetrics/revenueChart      — Revenue chart data
/adminMetrics/ordersChart       — Orders by status
/adminMetrics/stockHealth       — Stock health breakdown
/adminMetrics/topProducts       — Top 5 products by sales
/adminMetrics/categoryDistribution — Revenue by category
```

## Next steps after seeding

1. Connect `categoryService.getActiveCategories()` to the sidebar nav
2. Connect `productService.getActiveProducts()` to the product listing
3. Connect `productService.getProductById()` to the product detail page
4. Replace mock auth with Firebase Auth (Backend Step 3)
