import React, { useState } from 'react'

function Image({ className, photo }) {
    const [hovered, setHovered] = useState(false)
    const heartIcon = hovered && <i className="ri-heart-line favorite"></i>
    const cartIcon = hovered && <i className="ri-add-circle-line cart"></i>
    console.log(hovered);

    return (
        <div className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <img src={photo.url} className='image-grid' />
            {heartIcon}
            {cartIcon}
        </div>
    )
}
export default Image