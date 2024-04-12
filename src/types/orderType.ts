export type OrderType = {
  id: number,
  order_items: [
    {
      id: number,
      product: number,
      price: number
    }
  ],
  delivery_city: string,
  delivery_warehouse: string,
  total_price: string,
  created_at: string
}
