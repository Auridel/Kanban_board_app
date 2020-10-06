import React from "react";
import ServiceContext from "../serviceContext/serviceContext";

const WithService = () => (Wrapped) => {
    return (props) =>{
        return (
            <ServiceContext.Consumer>
                {
                    (service) => {
                        return(
                            <Wrapped {...props} service={service}/>
                        )
                    }
                }
            </ServiceContext.Consumer>
        )
    }
};

export default WithService;