import React from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!){
    deleteProduct(id: $id){
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct))
}


const DeleteProduct = ({ id, children }) => {

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, { variables: {id}, update})

  return (
    <button
     type="button"
     disable={loading}
     onClick={() => { 
    if(confirm('Are you sure you want to delete this product')){
      deleteProduct()
    }
}}
     >{children}</button>
  )
}

export default DeleteProduct