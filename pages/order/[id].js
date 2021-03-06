import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import Head from 'next/head'
import millify from 'millify';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!){
        order: Order(where: { id: $id}){
            id
            charge
            total
            user{
                id
            }
            items{
                id
                name
                description
                price
                quantity
                photo{
                    image{
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`

const SingleOrderPage = ({ query }) => {

    const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
        variables: { id: query.id, }
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <ErrorMessage error={error} />
    }
    const { order } = data;

    return (
        <OrderStyles>
            <Head>
                <title>Sick Fashion - {order.id}</title>
            </Head>
            <p>
                <span>Order Id: </span>
                <span>{order.id} </span>
            </p>
            <p>
                <span>Charge: </span>
                <span>{order.charge} </span>
            </p>
            <p>
                <span>Total: </span>
                <span>{millify(order.total)} </span>
            </p>
            <p>
                <span>Item count: </span>
                <span>{order.items.length} </span>
            </p>
            <div className="items">
                {order.items.map((item) => (
                       
                    <div className="order-item" key={item.id}>
                        <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {millify(item.price)}</p>
                            <p>Sub Total: {millify(item.price * item.quantity)}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </OrderStyles>
    )
}

export default SingleOrderPage;