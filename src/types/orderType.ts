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
  first_name: string,
  last_name: string,
  middle_name: string,
  phone_number: string,
  track_number: string,
}
