import React from 'react'
import Item from './styles/ItemStyles';
import Title from './styles/Title';
import Link from 'next/link';
import PriceTag from './styles/PriceTag';
import millify from 'millify';

const Product = ({ product }) => {
  return (
    <Item>
        <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
        <Title><Link href={`/product/${product.id}`}>{product.name}</Link></Title>
        <PriceTag>{millify(product.price)}</PriceTag>
        <p>{product.description}</p>
    </Item>
  )
}

export default Product