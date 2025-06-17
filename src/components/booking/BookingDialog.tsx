import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { BOOKING } from "@/constants/constants";
import MobileScreen from "@/utils/mobile-screen";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function BookingDialog({ openDialog, setOpenDialog }: {
    openDialog: boolean,
    setOpenDialog: (value: boolean) => void
}) {
    const isMobile = MobileScreen();

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            maxWidth={isMobile ? 'sm' : 'md'}
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="responsive-dialog-title"
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                },
            }}
        >
            <DialogTitle id="responsive-dialog-title">
                {BOOKING.BOOKING_CONFIRMATION}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{BOOKING.BOOKING_CONFIRMATION_MESSAGE}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>
                    {BUTTON_CONSTANTS.AGREE}
                </Button>
            </DialogActions>
        </Dialog>
    )
}