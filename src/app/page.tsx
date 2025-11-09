"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { getProducts } from "@/lib/api/productsApi";
import { Loader } from "@/components/common/Loader";

export default function HomePage() {
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.items);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const params: any = { limit, skip: reset ? 0 : skip };
      if (search) params.q = search;

      const data = await getProducts(params);
      setProducts((prev) =>
        reset ? data.products : [...prev, ...data.products]
      );
      setTotal(data.total);
      setSkip(reset ? limit : skip + limit);
    } catch (err: any) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, [search]);

  useEffect(() => {
    if (!loaderRef.current || products.length >= total || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [products, total, loading]);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Error */}
      {error && <p className="text-destructive mb-4">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Loader */}
      <div ref={loaderRef} className="py-8 text-center">
        {loading && <Loader />}
      </div>
    </div>
  );
}
