import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material"
import BookingDialog from "./BookingDialog"
import GuestsAndRooms, { GuestsAndRoomsPropsType, GuestsAndRoomsState } from "./GuestsRooms"
import RoomTypeDialog from "./RoomTypeDialog"
import { useState } from "react"
import MobileScreen from "@/utils/mobile-screen"
import useRoomTypeStore from "@/store/RoomType"
import { dateChangeCheck } from "@/utils/date"
import { useDatePickerStore } from "@/store/DatePickerStore"
import { SetState } from "@/types/SetState"
import { DateError } from "../datePicker"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function RoomTypeComponent({
    guestsAndRooms,
    setGuestsAndRooms,
    numberOfNights,
    dateSelectionRef,
    setDateError
}: {
    guestsAndRooms: GuestsAndRoomsState,
    setGuestsAndRooms: SetState<GuestsAndRoomsState>,
    numberOfNights: number,
    dateSelectionRef: React.RefObject<HTMLDivElement | null>,
    setDateError: SetState<DateError>
}) {

    const isMobile = MobileScreen();
    const { roomTypeData } = useRoomTypeStore();

    const [openBookingDialog, setOpenBookingDialog] = useState(false)
    const [openRoomTypeDialog, setOpenRoomTypeDialog] = useState(false)

    const datePickerStore = useDatePickerStore();

    const [roomType, setRoomType] = useState(null)


    const handleRoomTypeClick = (roomType: any) => {
        setOpenRoomTypeDialog(true)
        setRoomType(roomType)
    }

    const handleReserveBooking = (roomType: any) => {
        console.log('Booking reserved', roomType)
        const dateErrorCheck = dateChangeCheck(datePickerStore.checkIn, datePickerStore.checkOut);
        setDateError(dateErrorCheck);
        console.log(dateErrorCheck)
        if (dateErrorCheck.checkInError || dateErrorCheck.checkOutError) {
            dateSelectionRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        } else setOpenBookingDialog(true)
    }

    return (
        <>
            <Grid container spacing={2} mt={3} sx={{
                flexDirection: isMobile ? "row" : "column",
                width: isMobile ? '100' : 10 / 12
            }}>
                {roomTypeData.map((roomType, index) => {

                    const guestsAndRoomsProps: GuestsAndRoomsPropsType = {
                        roomType: roomType,
                        guestsAndRooms: guestsAndRooms,
                        setGuestsAndRooms: setGuestsAndRooms
                    }
                    return (
                        <Grid item key={index}
                            sx={{
                                maxWidth: "100%",
                            }}>
                            <Card
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    alignItems: "center",
                                    mb: 2,
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    transition: "transform 0.2s, box-shadow 0.3s",
                                    "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        cursor: "pointer",
                                        width: isMobile ? "100%" : 250,
                                        height: isMobile ? 180 : "100%",
                                        objectFit: "cover",
                                        borderRadius: isMobile ? "8px 8px 0 0" : "8px 0 0 8px",
                                    }}
                                    image={roomType.image}
                                    alt={roomType.name}
                                    onClick={() => handleRoomTypeClick(roomType)}
                                />

                                <CardContent sx={{ p: 3, width: "100%" }}>
                                    <Typography component="span"
                                        variant="h6"
                                        fontWeight="bold"
                                        color="primary"
                                        gutterBottom
                                        sx={{
                                            cursor: "pointer",
                                            transition: "color 0.3s ease-in-out",
                                            "&:hover": {
                                                color: "black",
                                            },
                                        }}
                                        onClick={() => handleRoomTypeClick(roomType)}
                                    >
                                        {roomType.name}<InfoOutlinedIcon sx={{ position: "relative", top: "4px", marginLeft: "24px" }} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={1.5}>
                                        {roomType.description}
                                    </Typography>
                                    <Typography component="span" variant="body1">
                                        <strong>Cost:</strong> ₹{roomType.cost} / person
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Number of Nights:</strong> {numberOfNights}
                                    </Typography>
                                    <Box sx={{
                                        display: "flex",
                                        gap: 3,
                                        flexWrap: isMobile ? 'wrap' : 'nowrap'
                                    }}>
                                        <Typography variant="h6" color="secondary" fontWeight="bold">
                                            Total Cost: ₹{(roomType.cost * (guestsAndRooms.guests[roomType.type] || 1) * (guestsAndRooms.rooms[roomType.type] || 1) * numberOfNights).toLocaleString()}
                                        </Typography>
                                        <GuestsAndRooms guestsAndRoomsProps={guestsAndRoomsProps}></GuestsAndRooms>
                                        <Box>
                                            <Button variant="contained" color="primary"
                                                onClick={() => handleReserveBooking(roomType)}>
                                                Reserve
                                            </Button>
                                            <BookingDialog openDialog={openBookingDialog} setOpenDialog={setOpenBookingDialog}></BookingDialog>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <RoomTypeDialog roomType={roomType} openDialog={openRoomTypeDialog} setOpenDialog={setOpenRoomTypeDialog} />
        </>
    )
}