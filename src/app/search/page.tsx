"use client";

import { useEffect, useState } from "react";
import { ProductList } from "@/components/product/ProductList";
import { Loader } from "@/components/common/Loader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { searchProducts } from "@/lib/api/productsApi";

function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setQuery(q);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await searchProducts(query);
        setResults(data.products);
        setTotal(data.total);
      } catch (err: any) {
        setError("No products found. Try a different search.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {query ? `Results for "${query}"` : "Search Products"}
      </h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && results.length === 0 && query && (
        <p className="text-center text-muted-foreground py-8">
          No products found for "<strong>{query}</strong>"
        </p>
      )}

      {results.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {total} product{total !== 1 ? "s" : ""} found
          </p>
          <ProductList products={results} />
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return <SearchResults />;
}
