import { SetState } from "@/types/SetState";
import MobileScreen from "@/utils/mobile-screen";
import { Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions, Button } from "@mui/material";
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import { buttonStyle, hideScrollBar } from "./servicesSection";
import { COMPLIMENTORY_SIGHTSEEING_LIST, CUSTOMIZED_SIGHTSEEING_LIST, TRAVEL_PLANS_SERVICE } from "@/constants/our-services";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";

export default function TravelPlansSection({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    const isMobile = MobileScreen();

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md" fullScreen={isMobile}>
            <DialogTitle>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <NavigationOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                    <Typography variant="h6">{TRAVEL_PLANS_SERVICE.TITLE}</Typography>
                </Box>
            </DialogTitle>
            <DialogContent dividers sx={hideScrollBar}>
                <Typography variant="body1" gutterBottom>
                    {TRAVEL_PLANS_SERVICE.DESCRIPTION}
                </Typography>

                {/* Included in Package */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TaskAltOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{TRAVEL_PLANS_SERVICE.INCLUDED_IN_PACKAGE}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {COMPLIMENTORY_SIGHTSEEING_LIST.map((list, index) => (
                            <Typography key={index} variant="body1">• {list}</Typography>
                        ))}
                    </Box>
                </Box>

                {/* Paid Custom Plans */}

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <HikingOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{TRAVEL_PLANS_SERVICE.CUSTOMIZED_SIGHTSEEING}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {CUSTOMIZED_SIGHTSEEING_LIST.map((list, index) => (
                            <Typography key={index} variant="body1">• {list}</Typography>
                        ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {TRAVEL_PLANS_SERVICE.NOTE}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={buttonStyle}>{BUTTON_CONSTANTS.AWESOME}</Button>
            </DialogActions>
        </Dialog>
    );
}