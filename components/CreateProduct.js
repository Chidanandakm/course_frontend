import gql from 'graphql-tag';
import React from 'react'
import useForm from '../lib/useForm'
import Form from './styles/Form';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';


const CREATE_PRODUCT_MUTATION = gql`
mutation CREATE_PRODUCT_MUTATION(
    
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
    ) {
    createProduct(data:{
      name: $name
      description: $description
      price: $price
      status: "AVAILABLE"
      photo: { create: { image: $image, altText: $name } }
    }) {
      id
      price
      name
      description
    }
  }
`;



const CreateProduct = () => {
    const { inputs, handleChange } = useForm({
        image: '',
        name: '',
        price: 0,
        description: '',
    })

    const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
    })


    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            console.log(inputs);
            const res = await createProduct();
            console.log(res);
        }}
        >
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading} >
                <label htmlFor="image">
                    Image
                    <input type="file"
                        id="image"
                        required
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input type="text"
                        id="name"
                        name="price"
                        placeholder="Price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    )
}

export default CreateProduct