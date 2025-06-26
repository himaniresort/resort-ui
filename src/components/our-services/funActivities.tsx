import { SetState } from "@/types/SetState";
import MobileScreen from "@/utils/mobile-screen";
import { Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions, Button } from "@mui/material";
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import SportsCricketOutlinedIcon from '@mui/icons-material/SportsCricketOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { FUN_ACTIVITIES_SERVICE } from "@/constants/our-services-constants";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { dialogButtonStyle, dialogBackDropProp, hideScrollBar } from "@/utils/style-settings";

export default function FunActivitiesSection({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    const isMobile = MobileScreen();

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md" fullScreen={isMobile}
            slotProps={dialogBackDropProp}>

            <DialogTitle>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <LocalActivityOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                    <Typography variant="h6">{FUN_ACTIVITIES_SERVICE.TITLE}</Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={hideScrollBar}>
                <Typography variant="body1" gutterBottom>
                    {FUN_ACTIVITIES_SERVICE.DESCRIPTION}
                </Typography>

                {/* Indoor Games */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <ExtensionOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{FUN_ACTIVITIES_SERVICE.INDOOR_GAMES}</Typography>
                    </Box>
                    <Typography variant="body1">
                        {FUN_ACTIVITIES_SERVICE.INDOOR_GAMES_LIST}
                    </Typography>
                </Box>

                {/* Outdoor Games */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <SportsCricketOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{FUN_ACTIVITIES_SERVICE.OUTDOOR_GAMES}</Typography>
                    </Box>
                    <Typography variant="body1">
                        {FUN_ACTIVITIES_SERVICE.OUTDOOR_GAMES_LIST}
                    </Typography>
                </Box>

                {/* Night Activities */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <LocalFireDepartmentOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{FUN_ACTIVITIES_SERVICE.NIGHT_ACTIVITES}</Typography>
                    </Box>
                    <Typography variant="body1">
                        {FUN_ACTIVITIES_SERVICE.NIGHT_ACTIVITES_LIST}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={dialogButtonStyle}>{BUTTON_CONSTANTS.ITS_FUN}</Button>
            </DialogActions>
        </Dialog>
    )
}