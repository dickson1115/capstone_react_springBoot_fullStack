import React, { useContext, useState } from "react";
import DropDown from "./DropDown";
import AircraftComponents from "./AircraftComponents";
import styles from "./AircraftComponentsSession.module.css";
import AuthContext from "../../AuthContext/AuthContext";
const AircraftComponentsSession = () => {
    const { dropDownOptionsViews, dropDownViewOnChange, dropDownOptionsAircraftModels, dropDownAircraftModelOnChange } = useContext(AuthContext);
    return (
        <div className={styles.aircraft_components_session}>
            <div style={{ marginRight: "20px" }}>
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Components
                </div>
                <DropDown
                    style={{ marginBottom: "5px", display: "block" }}
                    dropDownOptions={dropDownOptionsViews}
                    dropDownOnChange={dropDownViewOnChange}
                />
                <DropDown
                    style={{ display: "block" }}
                    dropDownOptions={dropDownOptionsAircraftModels}
                    dropDownOnChange={dropDownAircraftModelOnChange}
                />
            </div>
            <AircraftComponents />
        </div>
    );
};

export default AircraftComponentsSession;
