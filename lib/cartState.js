import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider

const CartStateProvider = ({children}) => {
    //local storage for state and functionality for children components


    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => (
        setCartOpen(!cartOpen)
    )
    const closeCart = () => (
        setCartOpen(false)
    )
    const openCart = () => (
        setCartOpen(true)
    )

    return (
        <LocalStateProvider value={{cartOpen, setCartOpen, toggleCart ,closeCart , openCart}}>
            {children}
        </LocalStateProvider>
    );
};

//custom Hook to access local state
const useCart =() => {
    const all = useContext(LocalStateContext);
    return all;
}

export { CartStateProvider, useCart }
