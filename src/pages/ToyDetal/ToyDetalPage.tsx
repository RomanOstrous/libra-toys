import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { client } from '../../services/httpClient';
import { ProductDetalType } from '../../types/ProductDetalsType';

export default function ToyDetalPage() {
  const [info, setInfo] = useState<ProductDetalType>();
  const { productId } = useParams();

  useEffect(() => {
    client.get<ProductDetalType>(`shop/products/${productId}`)
    .then(response => setInfo(response))
    .catch()
    .finally()
  }, [productId]);

  console.log(info)

  return (
    <>
    <div className="p">{info?.title}</div>
    <img src={info?.images[0].image} alt={info?.title} />
    </>
  )
}
