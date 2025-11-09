"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/lib/store/favoritesSlice";
import { RootState } from "@/lib/store";
import { Heart, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteProduct } from "@/lib/api/productsApi";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  product: any;
  onDelete?: (id: number) => void;
};

export function ProductCard({ product, onDelete }: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.items);
  const isFav = favorites.some((f) => f.id === product.id);
  const [deleting, setDeleting] = useState(false);

  const toggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(product.id));
      toast({ title: "Removed from favorites" });
    } else {
      dispatch(addFavorite(product));
      toast({ title: "Added to favorites" });
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product.id);
      toast({
        title: "Product deleted",
        description: `${product.title} has been removed.`,
      });
      if (isFav) dispatch(removeFavorite(product.id));
      onDelete?.(product.id);
    } catch (err) {
      toast({
        title: "Product deleted",
        description: `${product.title} has been removed.`,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-card hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`} className="block">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {product.category}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="font-semibold">${product.price}</p>
              <p className="text-xs">Rating: {product.rating}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-3 pt-0 flex justify-between items-center gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite();
          }}
          className={`flex items-center gap-1 text-sm transition-colors ${
            isFav ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
          {isFav ? "Favorited" : "Favorite"}
        </button>

        <div className="flex gap-1">
          <Link
            href={`/edit/${product.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete{" "}
                  <strong>{product.title}</strong>? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
