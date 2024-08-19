import React from "react";

const FrontDogInfoPills = ({data}) => {
    return(
        <div className="front-dog-info-pills">
            <h5 className="front-dog-breed-pill">
              {data.breed}
            </h5>
            <h5 className="front-dog-age-pill">
              {data.dog_age}
            </h5>
            <h5 className="front-dog-sex-pill">
              {data.dog_sex}
            </h5>
        </div>
    );
}

export default FrontDogInfoPills;