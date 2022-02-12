import React from 'react'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm'


const SINGLE_iTEM_QUERY = gql`
query SINGLE_iTEM_QUERY($id: ID!) {
    Product(where: {id: $id}) {
        id
        name
        description
        price
    }
}
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $price: Int
        $description: String
        ) {
            updateProduct(
                id: $id,
                data: {name: $name, description: $description, price: $price,}
            ) {
                id
                name
                description
                price
            }
        }
`;

const UpdateProduct = ({ id }) => {

    const { data, error, loading } = useQuery(SINGLE_iTEM_QUERY, { variables: { id } });

    const [updateProduct, { loading: updateLoading, data: updateData, error: UpdateError, }] = useMutation(UPDATE_PRODUCT_MUTATION)

    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product)
    console.log(inputs);
    if (loading) return <p>Loading...</p>;


    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            // //uploading to database
            const res = await updateProduct({
                variables: {
                    id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price

                },
            })
            console.log(res);
        }}
        >
            <DisplayError error={UpdateError || error} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading} >
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
                    <input type="number"
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
                <button type="submit">Update Product</button>
            </fieldset>
        </Form>
    )
}

export default UpdateProduct