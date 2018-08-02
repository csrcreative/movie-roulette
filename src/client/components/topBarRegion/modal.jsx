import React, { Component } from "react";
import ReactModal from "react-modal";
import ModalContent from "./modalContent.jsx";

ReactModal.setAppElement("#root");

class Modal extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.modalProps.showModal}
                onRequestClose={this.props.modalProps.handleCloseModal}
                shouldCloseOnOverlayClick={true}
                className="bg-white mw7 mt4 ml-auto mr-auto br2 pa3 relative"
                overlayClassName="ModalWindow fixed w-100 h-100 top-0">
                <ModalContent
                    saveUrl={this.props.modalProps.saveUrl}
                    handleCloseModal={this.props.modalProps.handleCloseModal}
                />
            </ReactModal>
        );
    }
}

export default Modal;
