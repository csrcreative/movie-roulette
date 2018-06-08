import React, { Component } from "react";
import SaveButton from "./saveButton";
//Add a save button component, this component will do the following
//generate an id (timestamp) and hash import
//create a list using generated id
//create all thumbups, wanttosees, rated with associated id
class TopBar extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (<div className="topBar"><SaveButton saveClick={this.props.saveClick}/></div>);
    }
}

export default TopBar;