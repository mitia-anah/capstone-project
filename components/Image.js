import React, { useContext, useState } from 'react'
import { Context } from '../useContext'
import { PropTypes } from 'prop-types'

function Image({ className, photo }) {
    const { toggleFavorite, cartItems, addToCart, removeItems } = useContext(Context)
    const [hovered, setHovered] = useState(false)

    function heartIcon() {
        if (photo.isFavorite) {
            return <i onClick={() => toggleFavorite(photo.id)} className="ri-heart-fill favorite"></i>
        } else if (hovered) {
            return <i onClick={() => toggleFavorite(photo.id)} className="ri-heart-line favorite"></i>
        }
    }

    function cartIcon() {
        if (cartItems.some(cartItem => cartItem.id === photo.id)) {
            return <i onClick={() => removeItems(photo.id)} className="ri-add-circle-line cart"></i>
        } else if (hovered) {
            return <i onClick={() => addToCart(photo)} className="ri-shopping-cart-fill cart"></i>
        }
    }

    return (
        <div className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {heartIcon()}
            {cartIcon()}
            <img src={photo.url} className='image-grid' />
        </div>
    )
}
Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
};
export default Image