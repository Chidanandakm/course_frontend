import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form'
import useForm from '../lib/useForm'
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`;

const RequestReset = () => {

    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [signup, { loading, data, error }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,

        // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
    if (loading) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup();

        resetForm();

    };



    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a Password Reset</h2>
            <Error error={error} />
            <fieldset>
                {
                    data?.sendUserPasswordResetLink === null && (<p>
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