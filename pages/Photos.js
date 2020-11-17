import React, { useContext } from 'react';
import { getClass } from '../utils'
import Image from '../components/Image'
import { Context } from '../useContext'

function Photos() {
	const { allPhotos } = useContext(Context)
	console.log(allPhotos);
	const imageElement = allPhotos.map((photo, index) => (
		<Image key={photo.id} photo={photo} className={getClass(index)} />
	))
	return (
		<main className="photos">
			{imageElement}
		</main>
	);
}

export default Photos;
