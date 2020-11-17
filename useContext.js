import React, { useEffect, useState } from 'react'
const Context = React.createContext();
const endPoint = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'

function ContextProvider({ children }) {
    const [allPhotos, setAllPhotos] = useState([])

    const getPhotos = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setAllPhotos(data);
        // console.log(data);
    }

    useEffect(() => {
        getPhotos(endPoint)
    }, [])

    return (
        <Context.Provider value={{ allPhotos }}>
            {children}
        </Context.Provider>
    )
}
export { ContextProvider, Context }