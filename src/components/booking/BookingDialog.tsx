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
                Booking Confirmation.
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please make a call to Admin to this number 9483362304 for the booking by make an advance payment. Once payment sucessfull your booking will be confirmed. Please get your booking Id from admin once after payment.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}