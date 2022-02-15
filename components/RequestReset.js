import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import Form from './styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`;

const RequestReset = () => {

    const { inputs, handleChange, clearForm, resetForm } = useForm({
        email: '',
    });

    const [signup, { loading, data, error }] = useMutation(REQUEST_RESET_MUTATION, {
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
            <h2>Request a Password Reset</h2>
            <DisplayError error={error} />
            <fieldset>
                {
                    data?.sendUserPasswordResetLink && (<p>
                        Success! Check your Email for the link
                    </p>)
                }
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
                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset;