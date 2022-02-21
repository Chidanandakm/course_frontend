import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ErrorMessage from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import Link from 'next/link'
import Head from 'next/head'
import millify from 'millify';
import styled from 'styled-components';

const USER_ORDER_QUERY = gql`
    query USER_ORDER_QUERY{
        allOrders{
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemInAnOrder = (order) => {
  return order.items.reduce((tally, item) => tally + item.quantity, 0)
}

const order = () => {

  const { data, error, loading } = useQuery(USER_ORDER_QUERY)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <ErrorMessage error={error} />
  }
  console.log(data);
  const { allOrders } = data;

  return (

    <div>
      <Head>
        <title>Your Orders</title>
      </Head>
      <h2>You Have {allOrders.length} Orders</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemInAnOrder(order)} item</p>
                  <p>{order.items.length} products</p>
                  <p>{millify(order.total)}</p>
                </div>
                <div className="images">
                  {
                    order.items.map((item) => (<img key={item.id}
                      src={item.photo?.image?.publicUrlTransformed} alt={item.name} />
                    ))
                  }
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>

  )
}

export default order;