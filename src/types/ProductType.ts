export type Product = {
  id: number;
  title: string;
  category: number,
  images: [
    {
      image: string;
    }
  ];
  slug: string;
  price: number;
}
