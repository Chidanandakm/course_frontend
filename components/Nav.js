import Link from 'next/link';
import React from 'react';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
    const user = useUser()
    console.log(user);
    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {
                user && (
                        <>
                        <Link href="/sell">Sell</Link>
                        <Link href="/orders">Orders</Link>
                        <Link href="/account">Account</Link>
                        <SignOut/>
                    </>
                )
            }
            {
                !user && (
                        <>
                        <Link href="/signin">Sing In</Link>
                    </>
                )
            }
        </NavStyles>
    )
};

export default Nav;
