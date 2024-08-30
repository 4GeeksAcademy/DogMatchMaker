import React from 'react';
import mandog1 from '../../img/mandog1.jpg'; // Adjust the path as needed
import mandog2 from '../../img/mandog2.jpg'; // Adjust the path as needed
import mandog3 from '../../img/mandog3.jpg'; // Adjust the path as needed
import mandog4 from '../../img/mandog4.jpg'; // Adjust the path as needed
import mandog5 from '../../img/mandog5.jpg'; // Adjust the path as needed
import mandog6 from '../../img/mandog6.jpg'; // Adjust the path as needed
import mandog7 from '../../img/mandog7.jpg'; // Adjust the path as needed
import mandog8 from '../../img/mandog8.jpg'; // Adjust the path as needed
import mandog9 from '../../img/mandog9.jpg'; // Adjust the path as needed
import mandog10 from '../../img/mandog10.jpg'; // Adjust the path as needed


const RandomMaleImage = () => {
    // Randomly select an image
    const images = [mandog1, mandog2, mandog3, mandog4, mandog5,
        mandog6, mandog7, mandog8, mandog9, mandog10
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <img
            src={randomImage}
            className="card-img"
            alt="Man with dog"
        />
    );
};

export default RandomMaleImage;