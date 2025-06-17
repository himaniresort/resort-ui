import { RoomType } from "@/types/RoomType";
import MobileScreen from "@/utils/mobile-screen";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function RoomTypeDialog({ roomType, openDialog, setOpenDialog }: {
    roomType: RoomType | null,
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
}) {
    const isMobile = MobileScreen();
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            fullScreen={isMobile}
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {roomType?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {roomType?.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}