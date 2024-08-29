import React, {useContext} from "react";
import { Context } from "../store/appContext.js";
import "../../styles/traitpills.css";


const TraitPills = ({data}) => {
    const { store, actions } = useContext(Context)
    return(
        <div className="traits-pills">
            <h5 className="trait-pill1">
              Friendly
            </h5>
            <h5 className="trait-pill2">
              Energetic
            </h5>
            <h5 className="trait-pill3">
              Gentle
            </h5>
        </div>
    );
}

export default TraitPills;