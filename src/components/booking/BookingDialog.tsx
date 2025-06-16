import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { BOOKING } from "@/constants/constants";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";

export default function BookingDialog({ openDialog, setOpenDialog }: {
    openDialog: boolean,
    setOpenDialog: (value: boolean) => void
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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