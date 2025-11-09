"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ProductList } from "@/components/product/ProductList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const favorites = useSelector((s: RootState) => s.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-4 py-8 text-center">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">No favorites yet</h1>
        <p className="text-muted-foreground mb-6">
          Start adding products you love!
        </p>
        <Link href="/">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      <p className="text-muted-foreground mb-6">
        {favorites.length} product{favorites.length !== 1 ? "s" : ""}
      </p>
      <ProductList products={favorites} />
    </div>
  );
}
