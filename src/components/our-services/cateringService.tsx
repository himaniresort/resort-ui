import { SetState } from "@/types/SetState";
import MobileScreen from "@/utils/mobile-screen";
import { Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions, Button } from "@mui/material";
import { buttonStyle, hideScrollBar } from "./servicesSection";
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';
import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { CATERING_SERVICES_CONSTANTS } from "@/constants/our-services";

export default function CateringService({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    const isMobile = MobileScreen();
    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md" fullScreen={isMobile}>
            <DialogTitle>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <RestaurantMenuOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                    <Typography variant="h6">{CATERING_SERVICES_CONSTANTS.TITLE}</Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={hideScrollBar}>
                <Typography variant="body1" gutterBottom>
                    {CATERING_SERVICES_CONSTANTS.DESCRIPTION}
                </Typography>

                {/* Daily Meals */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <BreakfastDiningOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{CATERING_SERVICES_CONSTANTS.BREAKFAST}</Typography>
                    </Box>
                    <Typography variant="body1" mt={1}>
                        {CATERING_SERVICES_CONSTANTS.BREAKFAST_ITEMS}
                    </Typography>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <SoupKitchenOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{CATERING_SERVICES_CONSTANTS.LUNCH}</Typography>
                    </Box>

                    <Typography sx={{ display: "flex", gap: 1 }} variant="subtitle1" mt={1}>
                        <Typography sx={{ fontWeight: "bold" }}>Veg:</Typography>
                        {CATERING_SERVICES_CONSTANTS.LUNCH_VEG_ITEMS}
                    </Typography>
                    <Typography sx={{ display: "flex", gap: 1 }} variant="subtitle1" mt={1}>
                        <Typography sx={{ fontWeight: "bold" }}>Non-Veg:</Typography>
                        {CATERING_SERVICES_CONSTANTS.LUNCH_NON_VEG_ITEMS}
                    </Typography>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <DinnerDiningOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{CATERING_SERVICES_CONSTANTS.DINNER}</Typography>
                    </Box>
                    <Typography sx={{ display: "flex", gap: 1 }} variant="subtitle1" mt={1}>
                        <Typography sx={{ fontWeight: "bold" }}>Veg:</Typography>
                        {CATERING_SERVICES_CONSTANTS.DINNER_VEG_ITEMS}
                    </Typography>
                    <Typography sx={{ display: "flex", gap: 1 }} variant="subtitle1" mt={1}>
                        <Typography sx={{ fontWeight: "bold" }}>Non-Veg:</Typography>
                        {CATERING_SERVICES_CONSTANTS.DINNER_NON_VEG_ITEMS}
                    </Typography>
                </Box>

                {/* A la carte options */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <FlatwareOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{CATERING_SERVICES_CONSTANTS.ACCORDING_TO_THE_MENU}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle1" mt={1}>{CATERING_SERVICES_CONSTANTS.MANGLOREAN_SPECIAL}</Typography>
                    <Typography variant="body1">
                        {CATERING_SERVICES_CONSTANTS.NON_VEG_MENU_LIST}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle1" mt={1}>{CATERING_SERVICES_CONSTANTS.VEG_MENU}</Typography>
                    <Typography variant="body1">
                        {CATERING_SERVICES_CONSTANTS.VEG_MENU_LIST}
                    </Typography><br></br>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {CATERING_SERVICES_CONSTANTS.NOTE}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={buttonStyle}>{BUTTON_CONSTANTS.YUM_YUM}</Button>
            </DialogActions>
        </Dialog>)
}