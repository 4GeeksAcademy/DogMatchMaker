import React, { useState, useEffect } from 'react';
import mandog1 from '../../img/mandog1.jpg';
import mandog2 from '../../img/mandog2.jpg';
import mandog3 from '../../img/mandog3.jpg';
import mandog4 from '../../img/mandog4.jpg';
import mandog5 from '../../img/mandog5.jpg';
import mandog6 from '../../img/mandog6.jpg';
import mandog7 from '../../img/mandog7.jpg';
import mandog8 from '../../img/mandog8.jpg';
import mandog9 from '../../img/mandog9.jpg';
import mandog10 from '../../img/mandog10.jpg';

const RandomMaleImage = ({ userId }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const imageKey = `male-${userId}`;
        const storedImage = localStorage.getItem(imageKey);

        if (storedImage) {
            setImage(storedImage);
        } else {
            const images = [mandog1, mandog2, mandog3, mandog4, mandog5, mandog6, mandog7, mandog8, mandog9, mandog10];
            const randomImage = images[Math.floor(Math.random() * images.length)];
            setImage(randomImage);
            localStorage.setItem(imageKey, randomImage);
        }
    }, [userId]);

    return (
        <img
            src={image}
            className="card-img"
            alt="Man with dog"
        />
    );
};

export default RandomMaleImage;
