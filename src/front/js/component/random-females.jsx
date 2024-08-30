import React from 'react';
import femaledog1 from '../../img/femaledog1.jpg'; // Adjust the path as needed
import femaledog2 from '../../img/femaledog2.jpg'; // Adjust the path as needed
import femaledog3 from '../../img/femaledog3.jpg'; // Adjust the path as needed
import femaledog4 from '../../img/femaledog4.jpg'; // Adjust the path as needed
import femaledog5 from '../../img/femaledog5.jpg'; // Adjust the path as needed
import femaledog6 from '../../img/femaledog6.jpg'; // Adjust the path as needed
import femaledog7 from '../../img/femaledog7.jpg'; // Adjust the path as needed
import femaledog8 from '../../img/femaledog8.jpg'; // Adjust the path as needed
import femaledog9 from '../../img/femaledog9.jpg'; // Adjust the path as needed
import femaledog10 from '../../img/femaledog10.jpg'; // Adjust the path as needed


const RandomFemaleImage = () => {
    // Randomly select an image
    const images = [femaledog1, femaledog2, femaledog3, femaledog4, femaledog5,
        femaledog6, femaledog7, femaledog8, femaledog9, femaledog10
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <img
            src={randomImage}
            className="card-img"
            alt="Female with dog"
        />
    );
};

export default RandomFemaleImage;