import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import Form from '../components/styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password){
            ... on UserAuthenticationWithPasswordSuccess{
                item{
                    id
                    name
                    email
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

const SignIn = () => {

    const { inputs, handleChange, clearForm, resetForm } = useForm({
        email: '',
        password: '',
    });

    const [signin, { loading, data }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,

        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
    if(loading) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signin();

        resetForm();

    };

    const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;


    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign In to Your Account</h2>
            <DisplayError error={error} />
            <fieldset>
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
                <button type="submit">Sign In</button>
            </fieldset>
        </Form>
    )
}

export default SignIn