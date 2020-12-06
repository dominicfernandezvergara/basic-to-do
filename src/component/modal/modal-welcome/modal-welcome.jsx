import React, { useState } from "react";
import "./modal.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { getWheaterDataCityName } from "../../../redux/weatherStore";
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// Gibhub actual modal: https://github.com/reactjs/react-modal
//otros ejemplos de modales: https://material-ui.com/es/components/dialogs/
const ModalCityChange = () => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const onSubmitCityName = (e, city) => {
    e.preventDefault();
    console.log("citymodal", city);
    dispatch(getWheaterDataCityName(city));
    setIsOpen(false);
    setCity("");
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    console.log("e.target.value", e.target.value);
    setCity(e.target.value);
    console.log("cityOnChange", city);
  };

  return (
    <div className="container-modal">
      <button className="button" onClick={openModal}>
        Change City Name
      </button>
      <Modal
        className="modal"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-message">
          <div className="modal-title">Welcome!</div>

          <div className="text">What is your city?</div>
          <form className="form">
            <input
              type="text"
              className="input"
              value={city}
              onChange={(e) => {
                onChangeInput(e);
              }}
              placeholder="CITY NAME"
            />
            <button
              className="button"
              onClick={(e) => onSubmitCityName(e, city)}
            >
              ENTER
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCityChange;
