import { BAR_ADDITIONAL_INFO_LIST, BAR_AND_DRINKS, BAR_RULES_LIST } from "@/constants/our-services";
import { SetState } from "@/types/SetState";
import { Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions, Button } from "@mui/material";
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { HEADER_CONSTANTS } from "@/constants/constants";
import { dialogBackDropProp, hideScrollBar } from "./servicesSection";
import MobileScreen from "@/utils/mobile-screen";

export default function BarAndDrinkService({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    const isMobile = MobileScreen();

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md" fullScreen={isMobile}
            slotProps={dialogBackDropProp}>
            <DialogTitle>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <LiquorOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                    <Typography variant="h6">{BAR_AND_DRINKS.TITLE}</Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={hideScrollBar}>
                <Typography variant="body1" gutterBottom>
                    {BAR_AND_DRINKS.DESCRIPTION}
                </Typography>

                {/* Hours Section */}
                <Box mt={2}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <AccessTimeIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{BAR_AND_DRINKS.HOURS_OF_OPERATION}</Typography>
                    </Box>
                    <Typography variant="body2">{BAR_AND_DRINKS.TIMINGS}</Typography>
                </Box>

                {/* Rules Section */}
                <Box mt={3}>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <DescriptionOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{BAR_AND_DRINKS.BAR_RULES}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {BAR_RULES_LIST.map((rule, index) => (
                            <Typography key={index} variant="body1">• {rule}</Typography>
                        ))}
                    </Box>
                </Box>

                {/* Additional Info Section */}
                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <DriveFileRenameOutlineIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{BAR_AND_DRINKS.ADDITIONAL_INFO}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {BAR_ADDITIONAL_INFO_LIST.map((rule, index) => (
                            <Typography key={index} variant="body1">• {rule}</Typography>
                        ))}
                    </Box>
                </Box>

                {/* Contact Section */}
                <Box mt={3}>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <PhoneOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{HEADER_CONSTANTS.CONTACT}</Typography>
                    </Box>
                    <Typography variant="body2">{`Bar Manager: ${HEADER_CONSTANTS.CONTACT_NO}`}</Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={{
                    color: "darkslategrey", "&:hover": {
                        color: "black",
                    }
                }}>{BAR_AND_DRINKS.GOT_IT}</Button>
            </DialogActions>
        </Dialog>
    );
}