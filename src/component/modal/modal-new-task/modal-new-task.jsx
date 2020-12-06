import React from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import styles from "./modal-new-task.module.css";

function ModalNewTask() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log("dataNewTask", data);
  };
  return (
    <div className={styles.containerModalNewProduct}>
      <h3>Create a New Task</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
          <div className={styles.inputBox}>
            <TextField
              id="type"
              label="Tipo (molde, pan pita, etc...)"
              type="text"
              name="type"
              className={styles.input}
              inputRef={register({ required: true })}
            />
          </div>
          {errors.type && (
            <span className={styles.errorInput}>
              Tipo requerido para continuar
            </span>
          )}
          <div className={styles.inputBox}>
            <TextField
              id="name"
              label="Nombre"
              type="text"
              name="name"
              className={styles.input}
              inputRef={register({ required: true })}
            />
          </div>
          {errors.name && (
            <span className={styles.errorInput}>
              Nombre requerido para continuar
            </span>
          )}
        </div>
        <Button className={styles.submitButton} type="submit">
          Add new Task
        </Button>
      </form>
    </div>
  );
}

export default ModalNewTask;
