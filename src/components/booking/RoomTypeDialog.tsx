import { RoomType } from "@/types/RoomType";
import MobileScreen from "@/utils/mobile-screen";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, Typography } from "@mui/material";
import Image from 'next/image';
import { useRef, useState } from "react";
import Slider from "react-slick";
import CloseIcon from '@mui/icons-material/Close';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import SmokeFreeOutlinedIcon from '@mui/icons-material/SmokeFreeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { TENT_FACILITIES, DELUXE_FACILITIES, BATHROOM_FACILITIES, VIEWS, ROOM_TYPE_CONSTANTS } from "@/constants/room-types-constants";
import { dialogBackDropProp, dialogButtonStyle, hideScrollBar } from "@/utils/style-settings";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";

export default function RoomTypeDialog({ roomType, openDialog, setOpenDialog }: {
    roomType: RoomType | null,
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
}) {
    const isMobile = MobileScreen();
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const sliderSettings = {
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
    };
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setCurrentSlide(index);
        sliderRef.current?.slickGoTo(index);
    };

    const sliderRef = useRef<Slider | null>(null);

    const images = [
        '/rooms/room-b1.jpg', '/rooms/room-b2.jpg', '/rooms/room-b3.jpg', '/rooms/room-b4.jpg', '/rooms/room-b5.jpg', '/rooms/room-b6.jpg'
    ];

    const facilities = roomType?.type === 'tent' ? TENT_FACILITIES : DELUXE_FACILITIES;

    return (
        <Dialog
            fullScreen={isMobile}
            open={openDialog}
            onClose={handleDialogClose}
            maxWidth="lg"
            fullWidth
            slotProps={dialogBackDropProp}
        >

            <DialogContent dividers sx={{ ...hideScrollBar, p: isMobile ? 0 : 1 }} >
                <Grid container spacing={1} sx={{ p: isMobile ? 0 : 3 }}>
                    {/* Left: Image Carousel */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{
                            position: 'relative', width: '100%', height: 500, overflow: 'hidden'
                        }}>
                            <Slider {...sliderSettings} ref={sliderRef}>
                                {images.map((src, i) => (
                                    <Box key={i} sx={{ position: 'relative', width: '100%', height: 500 }}>
                                        <Image
                                            src={src}
                                            alt={`Room ${i + 1}`}
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>

                        {/* Thumbnails */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2, mb: 2, px: isMobile ? 2 : 0 }}>
                            {images.map((src, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        position: 'relative',
                                        width: 75,
                                        height: 75,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: currentSlide === i ? '2px solid #1976d2' : '2px solid transparent',
                                    }}
                                    onClick={() => handleThumbnailClick(i)}
                                >
                                    <Image src={src} alt={`Thumb ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>


                    {/* Right: Room Details */}
                    <Grid item xs={12} md={5} sx={{ backgroundColor: isMobile ? "#ededed" : '' }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <DialogTitle sx={{ fontWeight: "bold", px: isMobile ? 2 : 3, pt: 0 }}>
                                {roomType?.name}
                            </DialogTitle>
                            {!isMobile && <CloseIcon sx={{ cursor: "pointer" }} onClick={handleDialogClose}></CloseIcon>}
                        </Box>

                        <Box sx={{ px: isMobile ? 2 : 3 }}>

                            {/* Facilities Overview */}
                            <Box display={"flex"} columnGap={2} rowGap={1} mb={2} flexWrap={"wrap"}>
                                <Box sx={{ display: "flex", gap: '4px' }}>
                                    <PeopleOutlinedIcon sx={{ fontSize: 20, position: "relative", top: '0px' }} />
                                    <Typography variant="subtitle2">{roomType?.capacity} {ROOM_TYPE_CONSTANTS.GUESTS}</Typography>
                                </Box>
                                {roomType && roomType.type === 'deluxe' && <Box sx={{ display: "flex", gap: '4px' }}>
                                    <PoolOutlinedIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="subtitle2">{ROOM_TYPE_CONSTANTS.SWIMMING_POOL_VIEW}</Typography>
                                </Box>}
                                <Box sx={{ display: "flex", gap: '4px' }}>
                                    <BathtubOutlinedIcon sx={{ fontSize: 18, position: "relative" }} />
                                    <Typography variant="subtitle2">{`${roomType?.type === 'deluxe' ? 2 : ''} ${roomType?.type !== 'tent' ? 'Private' : 'Common'} bathroom`}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: '4px' }}>
                                    <WifiOutlinedIcon sx={{ fontSize: 18, position: "relative", top: '2px' }} />
                                    <Typography variant="subtitle2">{ROOM_TYPE_CONSTANTS.FREE_WIFI}</Typography>
                                </Box>
                            </Box>

                            {/* Description */}
                            <Typography variant="body2" mb={2}>
                                {roomType?.longDescription}
                            </Typography>

                            {/* In Private Bathroom */}
                            <Box mb={2}>
                                <Box sx={{ display: "flex", gap: '4px' }}>
                                    <BathtubOutlinedIcon sx={{ fontSize: 20, position: "relative", top: '2px' }} />
                                    <Typography variant="subtitle1" fontWeight={"bold"}>{`${roomType?.type !== 'tent' ? 'In your private bathroom:' : 'In bathroom:'} `}</Typography>
                                </Box>
                                <Box>
                                    <List dense={true} disablePadding sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {BATHROOM_FACILITIES.map((facility, i) => (
                                            <ListItem disablePadding key={i} sx={{ flex: "1 0 50%" }}>
                                                <Box sx={{ display: "flex", gap: '4px' }}>
                                                    <DoneOutlinedIcon sx={{ fontSize: 18, position: "relative", top: '2px' }} />
                                                    <Typography variant="body2">{facility}</Typography>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>

                            {/* View */}
                            {roomType && roomType.type === 'deluxe' && <Box mb={2}>
                                <Box sx={{ display: "flex", gap: '4px' }}>
                                    <LandscapeOutlinedIcon sx={{ fontSize: 20, position: "relative", top: '2px' }} />
                                    <Typography variant="subtitle1" fontWeight={"bold"}> {ROOM_TYPE_CONSTANTS.VIEW}</Typography>
                                </Box>
                                <Box>
                                    <List dense={true} disablePadding sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {VIEWS.map((view, i) => (
                                            <ListItem disablePadding key={i} sx={{ flex: "1 0 50%" }}>
                                                <Box sx={{ display: "flex", gap: '4px' }}>
                                                    <DoneOutlinedIcon sx={{ fontSize: 18, position: "relative", top: '2px' }} />
                                                    <Typography variant="body2">{view}</Typography>
                                                </Box>
                                            </ListItem>
                                        )
                                        )}
                                    </List>
                                </Box>
                            </Box>}


                            {/* Facilities */}
                            <Box mb={2}>
                                <Box sx={{ display: "flex", gap: '4px' }}>
                                    <RoomServiceOutlinedIcon sx={{ fontSize: 20, position: "relative", top: '2px' }} />
                                    <Typography variant="subtitle1" fontWeight={"bold"}> {ROOM_TYPE_CONSTANTS.FACILITIES}</Typography>
                                </Box>
                                <Box>
                                    <List dense={true} disablePadding sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {facilities.map((facility, i) => (
                                            <ListItem disablePadding key={i} sx={{ flex: "1 0 50%" }}>
                                                <Box sx={{ display: "flex", gap: '4px' }}>
                                                    <DoneOutlinedIcon sx={{ fontSize: 18, position: "relative", top: '2px' }} />
                                                    <Typography variant="body2">{facility}</Typography>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>

                            {/* Smoking */}
                            <Box sx={{ display: "flex", gap: '4px', mb: isMobile ? 2 : 0 }}>
                                <SmokeFreeOutlinedIcon sx={{ fontSize: 20, position: "relative", top: '2px' }} />
                                <Box display={"flex"}>
                                    <Typography variant="subtitle1" fontWeight={"bold"}> Smoking:</Typography>
                                    <Typography variant="body2" p={'4px'}> {ROOM_TYPE_CONSTANTS.NO_SMOKING}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            {
                isMobile &&
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} sx={dialogButtonStyle}>{BUTTON_CONSTANTS.CLOSE}</Button>
                </DialogActions>}
        </Dialog >
    )
}