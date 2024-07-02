import { request } from "@/utils";

export function getAllProductsAPI(userId) {
  return request({
    url: `/api/products?user=${userId}`,
    method: "GET",
  });
}

export function createProductAPI(formData) {
  return request({
    url: `/api/products`,
    method: "POST",
    data: formData,
  });
}

export function getProductInfoAPI(productId) {
  return request({
    url: `/api/products/${productId}`,
    method: "GET",
  });
}
