"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description too short"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0),
  brand: z.string().min(2),
  category: z.string().min(2),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: any;
  onSubmit: (data: ProductFormData) => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
        }
      : {},
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-card shadow-lg rounded-lg border">
      <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
        {product ? "Update Product" : "Create Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title")}
            className={
              errors.title
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            rows={4}
            className={
              errors.description
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.description && (
            <p className="text-sm text-destructive mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={
                errors.price
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.price && (
              <p className="text-sm text-destructive mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className={
                errors.stock
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.stock && (
              <p className="text-sm text-destructive mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              {...register("brand")}
              className={
                errors.brand
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.brand && (
              <p className="text-sm text-destructive mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category")}
              className={
                errors.category
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.category && (
              <p className="text-sm text-destructive mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-lg"
        >
          {isSubmitting
            ? "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
