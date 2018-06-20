import React, { Component } from "react";

class DeleteButton extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    clickHandler() {
        this.props.deleteProps.delete({
            deleteType: this.props.deleteProps.deleteType,
            clickType: this.props.deleteProps.clickType,
            index: this.props.index
        });
    }
    render() {
        return (
            <button className="deleteBtn" onClick={this.clickHandler}>
                Delete
            </button>
        );
    }
}

export default DeleteButton;
