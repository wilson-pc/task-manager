import React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, TextField, Grid } from "@material-ui/core";
import firebase from "../../boot/firebase";
import { useSelector } from "react-redux";

const boards = firebase.firestore().collection("boards");

function SimpleDialog(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { user } = useSelector((state) => state.auth);
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await boards.add({
      name: name,
      description: description,
      userId: user.id,
    });
    setDescription("");
    setName("");
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Nuevo tablero</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                type="text"
                placeholder="Nombre del tablero"
                fullWidth
                name="name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                placeholder="Descripcion"
                fullWidth
                name="description"
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button-block"
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SimpleDialog;
