import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { getWheaterDataCityName } from "../../redux/weatherStore";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Gibhub actual modal: https://github.com/reactjs/react-modal
//otros ejemplos de modales: https://material-ui.com/es/components/dialogs/
function Example() {
  const [modalIsOpen, setIsOpen] = useState(false);
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
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    console.log("e.target.value", e.target.value);
    setCity(e.target.value);
    console.log("cityOnChange", city);
  };

  return (
    <div className="container-modal">
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Welcome!</h2>
        <button onClick={closeModal}>X</button>
        <div>What is your city?</div>
        <form>
          <input
            type="text"
            className="input"
            value={city}
            onChange={(e) => {
              onChangeInput(e);
            }}
            placeholder="CITY NAME"
          />
          <button onClick={(e) => onSubmitCityName(e, city)}>Start</button>
        </form>
      </Modal>
    </div>
  );
}

export default Example;
