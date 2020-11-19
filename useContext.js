import React, { useEffect, useState } from 'react'
const Context = React.createContext();
const endPoint = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'

function ContextProvider({ children }) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems);


    useEffect(() => {
        getPhotos(endPoint)
        initCartItems()
    }, [])

    // *** Initialize the data ***
    async function getPhotos(url) {
        // is there something with the string 'allPhotos' inside localStorage
        const lsAllPhotos = JSON.parse(localStorage.getItem('allPhotos'));
        if (lsAllPhotos) {
            // set the local storage value to state
            setAllPhotos(lsAllPhotos);
        } else {
            console.log('nothing in ls, we go and fetch the data we need');
            const response = await fetch(url);
            const data = await response.json();
            setAllPhotos(data);
        }
    }
    function initCartItems() {
        const lsCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (lsCartItems) {
            setCartItems(lsCartItems);
        }
    }
    // *** synchronization of the data with LS ***
    useEffect(() => {
        if (allPhotos.length > 0) {
            localStorage.setItem('allPhotos', JSON.stringify(allPhotos));
        }
    }, [allPhotos]);
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

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

    function emptyCard() {
        console.log('Order placed!');
        setTimeout(() => {
            setCartItems([])
        }, 3000)
    }

    return (
        <Context.Provider value={{ allPhotos, toggleFavorite, cartItems, addToCart, removeItems, emptyCard }}>
            {children}
        </Context.Provider>
    )
}
export { ContextProvider, Context }