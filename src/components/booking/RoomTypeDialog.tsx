import { RoomType } from "@/types/RoomType";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";

export default function RoomTypeDialog({ roomType, openDialog, setOpenDialog }: {
    roomType: RoomType | null,
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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