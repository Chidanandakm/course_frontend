import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form'
import useForm from '../lib/useForm'
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!
        $password: String!
        $token: String!){
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            code
            message
        }
    }
`;

const Reset = ({ token }) => {

    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token,
    });

    const [reset, { loading, data, error }] = useMutation(RESET_MUTATION, {
        variables: inputs,
    })
    if (loading) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault();

        await reset().catch(error.message);

        resetForm();

    };

    const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset your Password</h2>
            <Error error={error || successfulError} />
            <fieldset>
                {
                    data?.redeemUserPasswordResetToken === null && (<p>
                        Success! you can sign in 
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
                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    )
}

export default Reset;