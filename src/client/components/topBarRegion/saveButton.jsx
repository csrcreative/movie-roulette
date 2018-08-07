import React, { Component } from "react";

//TODO: IF USER HAS DELETED ALL THUMBED UP/WANT TO SEE MOVIES BUT HASN'T SAVED, HIDE THE SAVE BUTTON
class SaveButton extends Component {
    constructor() {
        super();

        this.state = {
            saved: false,
            disabled: false
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {}

    clickHandler() {
        this.props.saveClick(true);
        this.setState({saved: true, disabled: true});
    }
    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <button className="saveButton pa3 ba bw2 b--black" onClick={this.clickHandler} disabled={this.state.disabled}>
                {
                    this.state.saved ?
                    'Saved' : 'Save'
                }
            </button>
        );
    }
}

export default SaveButton;
