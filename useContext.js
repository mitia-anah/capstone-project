import React, { useEffect, useState } from 'react'
const Context = React.createContext();
const endPoint = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'

function ContextProvider({ children }) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems);

    const getPhotos = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setAllPhotos(data);
        // console.log(data);
    }

    useEffect(() => {
        getPhotos(endPoint)
    }, [])

    function toggleFavorite(id) {
        const newPhotosArray = allPhotos.map(photo => {
            //if it is the one, let's return an update object
            if (photo.id === id) {
                console.log(id);
                return {
                    ...photo,
                    isFavorite: !photo.isFavorite
                }
            }
            // it is not the one I'm looking for, therefore, I will not change it
            return photo
        })
        setAllPhotos(newPhotosArray)
    }
    function removeItems(id) {
        // const removeImg = cartItems.filter(cartItem => cartItem.id !== id)
        // setCartItems(removeImg)
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }
    function addToCart(photo) {
        // how to add an element to an array, in an immutable way
        // push is mutable (array,push(newStuff))
        // map is immutable (let newArr = array.map())
        // cartItems.push()

        setCartItems(prevItem => [...prevItem, photo])
    }

    function placeOrder() {
        setTimeout(() => {
            console.log('Order placed!');
        }, 3000)
    }




    return (
        <Context.Provider value={{ allPhotos, toggleFavorite, cartItems, addToCart, removeItems, placeOrder }}>
            {children}
        </Context.Provider>
    )
}
export { ContextProvider, Context }