"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProduct } from "@/lib/api/productsApi";
import { ProductDetails } from "@/components/product/ProductDetails";
import { Loader } from "@/components/common/Loader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!id) return;

      const productId = Array.isArray(id) ? id[0] : id;

      try {
        const data = await getProduct(productId);
        if (!mounted.current) return;

        if (!data || data.id === undefined) {
          setError("Product not found.");
        } else {
          setProduct(data);
        }
      } catch (err: any) {
        if (!mounted.current) return;
        setError(err.message || "Failed to load product.");
      } finally {
        if (mounted.current) setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container py-8 max-w-6xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <ProductDetails product={product} />
    </div>
  );
}
