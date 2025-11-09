import axiosClient from "./axiosClient";

export type GetProductsParams = {
  limit?: number;
  skip?: number;
  select?: string;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export async function getProducts(params: GetProductsParams = {}) {
  const res = await axiosClient.get("/products", { params });
  return res.data;
}

export async function searchProducts(
  q: string,
  params: Partial<GetProductsParams> = {}
) {
  const res = await axiosClient.get("/products/search", {
    params: { q, ...params },
  });
  return res.data;
}

export async function getProduct(id: number | string) {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data;
}

export async function getCategories() {
  const res = await axiosClient.get(`/products/categories`);
  return res.data;
}

export async function getByCategory(
  category: string,
  params: Partial<GetProductsParams> = {}
) {
  const res = await axiosClient.get(
    `/products/category/${encodeURIComponent(category)}`,
    { params }
  );
  return res.data;
}

export async function addProduct(payload: Record<string, any>) {
  const res = await axiosClient.post(`/products/add`, payload);
  return res.data;
}

export async function updateProduct(
  id: number | string,
  payload: Record<string, any>
) {
  const res = await axiosClient.put(`/products/${id}`, payload);
  return res.data;
}

export async function deleteProduct(id: number | string) {
  const res = await axiosClient.delete(`/products/${id}`);
  return res.data;
}
