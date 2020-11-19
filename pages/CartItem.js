import React, { useContext, useState } from 'react'
import { Context } from '../useContext'

function CartItem({ item }) {
    const { removeItems } = useContext(Context)
    const [hovered, setHovered] = useState(false)

    const iconClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return (
        <div className='cart-item'>
            <i
                className={iconClassName}
                onMouseOver={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => removeItems(item.id)}>
            </i>
            <img src={item.url} width='130px' />
            <p>$5.99</p>
        </div>
    )
}

export default CartItem
