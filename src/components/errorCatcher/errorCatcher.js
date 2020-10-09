import React from "react";
import Error from "../error/error";

export default class ErrorCatcher extends React.Component{
    state = {
        error: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) return <Error/>;
        return this.props.children;
    }
}