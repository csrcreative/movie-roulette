import React, { Component } from "react";
const _ = require("lodash");

class ModalContent extends Component {
    constructor() {
        super();

        this.state = {
            closeClick: false
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {}

    componentDidUpdate() {
        if (this.state.closeClick === true) {
            this.setState(prevState => {
                let state = {
                    modalClasses: [...prevState.modalClasses, "dn"],
                    closeClick: false
                };

                return state;
            });
        }
    }

    clickHandler() {
        this.props.handleCloseModal();
    }

    componentWillReceiveProps(props, state) {
    }

    render() {
        return (
            <div>
                <p>Your selections have been saved to this url:</p>
                <div className="bg-light-gray pa3 ba b--silver br br2">
                    {this.props.saveUrl}
                </div>

                <button
                    className="absolute top-1 right-1"
                    onClick={this.clickHandler}
                >
                    Close
                </button>
            </div>
        );
    }
}

export default ModalContent;
