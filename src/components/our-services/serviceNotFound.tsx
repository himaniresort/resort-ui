import { SetState } from "@/types/SetState";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export default function ServiceNotFound({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                🤖 403: Feature in Progress
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The requested feature is currently under construction by a highly caffeinated team of developers (and at least one confused robot).
                    <br />
                    It’ll be online soon. Until then, please pretend it exists and continue smiling 🙂.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} autoFocus>
                    {"I\'LL WAIT PATIENTLY 🤖"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}