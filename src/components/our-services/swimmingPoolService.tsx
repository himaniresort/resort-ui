import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import Image from 'next/image';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { SetState } from "@/types/SetState";
import { POOL_IMAGES, POOL_RULES_LIST, POOL_SAFETY_LIST, SWIMMINGPOOL_CONSTANTS } from "@/constants/our-services-constants";
import { HEADER_CONSTANTS } from "@/constants/constants";
import MobileScreen from "@/utils/mobile-screen";
import { dialogButtonStyle, dialogBackDropProp, hideScrollBar } from "@/utils/style-settings";

export default function SwimmingPoolService({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: SetState<boolean> }) {
    const isMobile = MobileScreen();

    return (
        <Dialog open={openDialog}
            onClose={() => setOpenDialog(false)} fullWidth maxWidth="md" fullScreen={isMobile}
            slotProps={dialogBackDropProp}>
            <DialogTitle>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <PoolOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                    <Typography variant="h6">{SWIMMINGPOOL_CONSTANTS.TITLE}</Typography>
                </Box>
            </DialogTitle>


            <DialogContent dividers sx={hideScrollBar}>
                <Typography variant="body1" gutterBottom>{SWIMMINGPOOL_CONSTANTS.DESCRIPTION}</Typography>

                <Box mt={2}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <DescriptionOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{SWIMMINGPOOL_CONSTANTS.POOL_RULES}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {POOL_RULES_LIST.map((rule, index) => (
                            <Typography key={index} variant="body1">• {rule}</Typography>
                        ))}
                    </Box>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <AccessTimeIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{SWIMMINGPOOL_CONSTANTS.HOURS}</Typography>
                    </Box>
                    <Typography variant="body2">{SWIMMINGPOOL_CONSTANTS.TIMINGS}</Typography>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <CameraAltOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{SWIMMINGPOOL_CONSTANTS.GALLERY}</Typography>
                    </Box>
                    <Box display="flex" gap={2} mt={1} overflow="auto">
                        {POOL_IMAGES.map((src, i) => (
                            <Box key={i}>
                                <Image
                                    src={src}
                                    alt={`Pool view ${i + 1}`}
                                    width={250}
                                    height={200}
                                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <LightbulbOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{SWIMMINGPOOL_CONSTANTS.HEALTH_AND_SAFETY}</Typography>
                    </Box>
                    <Box overflow="auto" mt={1} pl={2}>
                        {POOL_SAFETY_LIST.map((rule, index) => (
                            <Typography key={index} variant="body1">• {rule}</Typography>
                        ))}
                    </Box>
                </Box>

                <Box mt={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <PhoneOutlinedIcon sx={{ position: "relative", top: "4px" }} />
                        <Typography variant="h6">{SWIMMINGPOOL_CONSTANTS.FOR_ASSISTANCE}</Typography>
                    </Box>
                    <Typography variant="body2">{`Reception: ${HEADER_CONSTANTS.CONTACT_NO}`}</Typography>
                    <Typography variant="body2">{`Email: ${HEADER_CONSTANTS.EMAIL}`}</Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => window.open('/pool/MMH_Pool_rules.jpeg', '_blank')} sx={{
                    color: "darkslategrey",
                    "&:hover": {
                        color: "black",
                    }
                }}><DescriptionOutlinedIcon /> {SWIMMINGPOOL_CONSTANTS.DOWNLOAD_RULES}</Button>
                <Button onClick={() => setOpenDialog(false)} sx={dialogButtonStyle} >{SWIMMINGPOOL_CONSTANTS.ACKNOWLEDGE}</Button>
            </DialogActions>

        </Dialog>
    )
}