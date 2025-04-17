// app/products/page.tsx
import { Suspense } from "react";
import ProductsClient from "./productClient"; // just a normal import

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-5">Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
