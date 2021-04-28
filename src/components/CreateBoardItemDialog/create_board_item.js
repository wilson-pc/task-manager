import React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, TextField, Grid } from "@material-ui/core";
import firebase from "../../boot/firebase";

const boards = firebase.firestore().collection("boards");

function CreateItemDialog(props) {
  const [name, setName] = React.useState("");
  const { onClose, open, boardId } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    boards
      .doc(boardId)
      .collection("items")
      .add({ state: "PENDING", name: name });
    setName("");
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Nuevo Item</DialogTitle>
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button-block"
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

CreateItemDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default CreateItemDialog;
