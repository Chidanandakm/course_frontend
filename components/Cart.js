import CartStyles from './styles/CartStyles';
import {useUser} from './User';
import Supreme from './styles/Supreme';
import styled from 'styled-components';
import millify from 'millify';
import calcTotalPrice from '../lib/calcTotalPrice';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
    return <CartItemStyles>
        <img width="100" src={cartItem.product.photo.image.publicUrlTransformed} alt={cartItem.product.name} />
        <div>
           <h3> {cartItem.product.name}</h3>
           <p>
               {millify(cartItem.product.price * cartItem.quantity)}
               -
               {<em>{cartItem.quantity} &times; {millify(cartItem.product.price)} each</em>}
            </p>
        </div>
    </CartItemStyles>;
}

const Cart = () => {
    const me = useUser();
    if(!me) return null;
    console.log(me);
  return (
    <CartStyles open>
        <header>
            <Supreme>{me.name}'s Cart</Supreme>
        </header>
        <ul>
            {
                me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)
            }
        </ul>
        <footer>
            <p>{millify(calcTotalPrice(me.cart))}</p>
        </footer>
    </CartStyles>
  )
}

export default Cart