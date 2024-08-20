import React from "react";

const BackDogInfoPills = ({data}) => {
    return(
        <div className="back-dog-info-pills">
            <h5 className="back-dog-breed-pill">
              {data.breed}
            </h5>
            <h5 className="back-dog-age-pill">
              {data.dog_age}
            </h5>
            <h5 className="back-dog-sex-pill">
              {data.dog_sex}
            </h5>
        </div>
    );
}

export default BackDogInfoPills;