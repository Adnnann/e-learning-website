import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCloseAccountModalStatus,
  setCloseAccountForm,
  setCloseAccountModal,
  setEditUserPasswordForm,
  setEditUserProfileForm,
} from "../../features/eLearningSlice";
import Modal from "@mui/material/Modal";
import { Box } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const closeAccountModalStatus = useSelector(getCloseAccountModalStatus);

  const redirectToCloseAccountForm = () => {
    dispatch(setCloseAccountModal(false));
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountForm(true));
  };

  const cancel = () => {
    dispatch(setCloseAccountModal(false));
  };

  const handleClose = () => dispatch(setCloseAccountModal(false));

  return (
    <Modal
      open={closeAccountModalStatus}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <DialogTitle>DELETE ACCOUNT</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus="autoFocus"
            onClick={redirectToCloseAccountForm}
          >
            OK
          </Button>
          <Button color="primary" autoFocus="autoFocus" onClick={cancel}>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;