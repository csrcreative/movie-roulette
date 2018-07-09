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
            <button className="deleteBtn mt2 f7 link dim br1 ba ph3 pv2 mb2 dib near-black" onClick={this.clickHandler}>
                Remove
            </button>
        );
    }
}

export default DeleteButton;
