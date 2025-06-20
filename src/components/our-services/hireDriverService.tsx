import { SetState } from "@/types/SetState";
import MobileScreen from "@/utils/mobile-screen";
import { Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions, Button } from "@mui/material";
import ToysOutlinedIcon from '@mui/icons-material/ToysOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { HEADER_CONSTANTS } from "@/constants/constants";
import { buttonStyle, hideScrollBar } from "./servicesSection";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { AVAILABLE_FOR_LIST, HIRE_DRIVER_SERVICE, HIRE_DRIVER_SERVICE_NOTES } from "@/constants/our-services";

export default function HireDriverService({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    const isMobile = MobileScreen();

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md" fullScreen={isMobile}>
            <DialogTitle>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <ToysOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                    <Typography variant="h6">{HIRE_DRIVER_SERVICE.TITLE}</Typography>
                </Box>
            </DialogTitle>
            <DialogContent dividers sx={hideScrollBar}>
                <Typography variant="body1" gutterBottom>
                    {HIRE_DRIVER_SERVICE.DESCRIPTION}
                </Typography>

                {/* Service Details */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <CheckBoxOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{HIRE_DRIVER_SERVICE.AVAILABLE_FOR}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {AVAILABLE_FOR_LIST.map((list, index) => (
                            <Typography key={index} variant="body1">• {list}</Typography>
                        ))}
                    </Box>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <PushPinOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{HIRE_DRIVER_SERVICE.NOTES}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {HIRE_DRIVER_SERVICE_NOTES.map((list, index) => (
                            <Typography key={index} variant="body1">• {list}</Typography>
                        ))}
                    </Box>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <PhoneOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{HIRE_DRIVER_SERVICE.CONTACT_TO_HIRE}</Typography>
                    </Box>
                    <Typography variant="body2">{`Call/WhatsApp: ${HEADER_CONSTANTS.CONTACT_NO}`}</Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={buttonStyle}>{BUTTON_CONSTANTS.CLOSE}</Button>
            </DialogActions>
        </Dialog>
    )
}