import React from "react";
import styles from "./nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  const onClickHeart = () => {
    history.push("/new-task");
  };

  const onClickHome = () => {
    history.push("/home");
  };

  const onClickSetting = () => {
    history.push("/new-task");
  };

  return (
    <div className={styles.containerNav}>
      <IconButton onClick={onClickHeart}>
        <FontAwesomeIcon icon={faPlus} className="heart-icon" />
      </IconButton>
      <IconButton onClick={onClickHome}>
        <FontAwesomeIcon icon={faHome} className="home-icon" />
      </IconButton>
      <IconButton onClick={onClickSetting}>
        <FontAwesomeIcon icon={faCog} className="settings-icon" />
      </IconButton>
    </div>
  );
};

export default Nav;
