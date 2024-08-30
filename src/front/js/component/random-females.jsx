import React, { useState, useEffect } from 'react';
import femaledog1 from '../../img/femaledog1.jpg';
import femaledog2 from '../../img/femaledog2.jpg';
import femaledog3 from '../../img/femaledog3.jpg';
import femaledog4 from '../../img/femaledog4.jpg';
import femaledog5 from '../../img/femaledog5.jpg';
import femaledog6 from '../../img/femaledog6.jpg';
import femaledog7 from '../../img/femaledog7.jpg';
import femaledog8 from '../../img/femaledog8.jpg';
import femaledog9 from '../../img/femaledog9.jpg';
import femaledog10 from '../../img/femaledog10.jpg';

const RandomFemaleImage = ({ userId }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const imageKey = `female-${userId}`;
        const storedImage = localStorage.getItem(imageKey);

        if (storedImage) {
            setImage(storedImage);
        } else {
            const images = [femaledog1, femaledog2, femaledog3, femaledog4, femaledog5, femaledog6, femaledog7, femaledog8, femaledog9, femaledog10];
            const randomImage = images[Math.floor(Math.random() * images.length)];
            setImage(randomImage);
            localStorage.setItem(imageKey, randomImage);
        }
    }, [userId]);

    return (
        <img
            src={image}
            className="card-img"
            alt="Female with dog"
        />
    );
};

export default RandomFemaleImage;
