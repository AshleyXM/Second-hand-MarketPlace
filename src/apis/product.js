import { request } from "@/utils";

export function getAllProductsAPI() {
  return request({
    url: "/api/products",
    method: "GET",
  });
}

export function getProductInfoAPI(productId) {
  return request({
    url: `/api/products/${productId}`,
    method: "GET",
  });
}
