import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import Head from 'next/head'
import styled from "styled-components";

const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow:column;
    gap: 2rem;
    max-width: var(--maxWidth);
    justify-content: center;
    align-items: top;
    img {
      width: 100%;
      object-fit: contain;
    }
  `;

const SINGLE_iTEM_QUERY = gql`
query SINGLE_iTEM_QUERY($id: ID!) {
    Product(where: {
      id: $id
    }) {
      id
      name
      price
      description
      photo {
          altText
          image {
              publicUrlTransformed
          }
      }
    }
  }
`;

export const SingleProduct = ({ id }) => {
    const { loading, data, error } = useQuery(SINGLE_iTEM_QUERY, { variables: { id } });
    console.log({ loading, data, error });
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p><DisplayError error={error} /></p>
    }

    const { Product } = data;

    return (
        <ProductStyles>
            <Head>
                <title>Sick Fashion | {Product.name}</title>
            </Head>
            <img src={Product.photo.image.publicUrlTransformed} alt={Product.photo.altText} />
            <div className="details">
                <h2>{Product.name}</h2>
                <p>{Product.description}</p>
            </div>
        </ProductStyles>
    )
}
