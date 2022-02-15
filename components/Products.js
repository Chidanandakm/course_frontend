import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import {perPage} from '../config'

import gql from 'graphql-tag';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
query ALL_PRODUCTS_QUERY( $skip: Int=4, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = styled.div`
    display : grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;

`

const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY,
    {
      variables: {
        skip: page * perPage - perPage,
        first: perPage
      },
    });
  // console.log(perPage);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <ProductsList>
        {data.allProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductsList>
    </div>
  )
}

export default Products