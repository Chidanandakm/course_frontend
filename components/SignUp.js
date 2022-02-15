import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import Form from './styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String!){
        createUser(data: {
            email: $email
            name: $name
            password: $password
        }) {
            id
            name
            email
        }
    }
`;

const SignUp = () => {

    const { inputs, handleChange, clearForm, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    });

    const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,

        // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
    if(loading) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup().catch(error.message);

        resetForm();

    };

    

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up for an Account</h2>
            <DisplayError error={error} />
            <fieldset>
                {
                    data?.createUser && (<p>
                        Signed up with {data.createUser.email} - please Go Head and Sign In
                    </p>)
                }
                <label htmlFor="name">
                    Name
                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </fieldset>
        </Form>
    )
}

export default SignUp