export type Product = {
  id: number;
  title: string;
  category: {
    "id": number,
    "title": string,
    "slug": string
  },
  images: [
    {
      image: string;
    }
  ];
  slug: string;
  price: number;
}
