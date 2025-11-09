"use client";

import { ProductForm } from "@/components/product/ProductForm";
import { addProduct } from "@/lib/api/productsApi";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await addProduct(data);
      toast({
        title: "Success",
        description: "Product created successfully!",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create product.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
          Create New Product
        </h1>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
