import React from "react";
import ServiceContext from "../serviceContext/serviceContext";
import service from "../../service/service";

const WithService = (Wrapped) => {
    return (props) =>{
        return (
            <ServiceContext.Consumer>
                {
                    (service) => {
                        return(
                            <Wrapped props={props} service={service}/>
                        )
                    }
                }
            </ServiceContext.Consumer>
        )
    }
};

export default WithService;