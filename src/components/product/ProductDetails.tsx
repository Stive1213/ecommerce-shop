"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { addFavorite, removeFavorite } from "@/lib/store/favoritesSlice";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type ProductDetailsProps = {
  product: any;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites?.items || []);
  const isFav = favorites.some((f: any) => f.id === product.id);

  const [mainImage, setMainImage] = useState<string>(
    product.thumbnail || product.images?.[0] || ""
  );

  const toggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(product.id));
      toast({ title: "Removed from favorites" });
    } else {
      dispatch(addFavorite(product));
      toast({ title: "Added to favorites" });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div className="grid grid-cols-4 gap-2">
          {[product.thumbnail, ...(product.images || [])]
            .slice(0, 4)
            .map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-md overflow-hidden ${
                  mainImage === img ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-20 object-cover" />
              </button>
            ))}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground mt-2">{product.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="ml-2 text-sm">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.stock} in stock
          </span>
        </div>

        <div className="text-4xl font-bold">${product.price}</div>

        <div className="flex gap-3">
          <Button
            onClick={toggleFavorite}
            variant={isFav ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
            {isFav ? "Favorited" : "Add to Favorites"}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};
