"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductForm } from "@/components/product/ProductForm";
import { getProduct, updateProduct } from "@/lib/api/productsApi";
import { Loader } from "@/components/common/Loader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id as string);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      await updateProduct(id as string, data);
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
      router.push(`/product/${id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update product.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <p className="text-lg text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-foreground">
            Edit Product
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <ProductForm product={product} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
