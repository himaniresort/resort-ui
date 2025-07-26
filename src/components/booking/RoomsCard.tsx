import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import MobileScreen from "@/utils/mobile-screen";
import { COLOR_CONSTANTS } from "@/constants/colors-constants";
import { RoomType } from "@/types/RoomType";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { primaryButtonStyle } from "@/utils/style-settings";
import { useState } from "react";
import { useDatePickerStore } from "@/store/DatePickerStore";
import BookingDialog from "./BookingDialog";

function RoomsCard({
  roomType,
  handleRoomInfoClick,
}: {
  roomType: RoomType;
  handleRoomInfoClick: (roomType: RoomType) => void;
}) {
  const isMobile = MobileScreen();
  const { numberOfNights } = useDatePickerStore();

  const [roomsSelected, setRoomsSelected] = useState<string>("");
  const [guestsSelected, setGuestsSelected] = useState<string>("");
  const [openBookingDialog, setOpenBookingDialog] = useState(false);

  const resetRoomsAndGuests = () => {
    setRoomsSelected("");
    setGuestsSelected("");
  };

  return (
    <>
      <Grid
        item
        sx={{
          width: isMobile ? "100%" : { xs: "100%", md: "calc(70% - 16px)" }, // Full width on mobile, half width on desktop (minus spacing)
          maxWidth: "100%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            mb: 2,
            borderRadius: 3,
            boxShadow: 3,
            transition: "transform 0.2s, box-shadow 0.3s",
            "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
            height: "100%", // Ensure equal height
          }}
        >
          {/* Card Media (image) */}
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
          />

          {/* Card Content */}
          <CardContent sx={{ p: 3, width: "100%" }}>
            <Typography
              component="span"
              variant="h6"
              fontWeight="bold"
              color={COLOR_CONSTANTS.textGreyP}
              gutterBottom
              sx={{
                cursor: "pointer",
                transition: "color 0.3s ease-in-out",
                "&:hover": { color: COLOR_CONSTANTS.textGreyS },
              }}
              onClick={() => handleRoomInfoClick(roomType)}
            >
              {roomType.name}
              <Tooltip
                title="Click to view more information"
                placement="top"
                arrow
              >
                <InfoOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "4px",
                    marginLeft: "12px",
                  }}
                />
              </Tooltip>
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={1.5}>
              {roomType.shortDescription}
            </Typography>

            <Typography component="span" variant="body1">
              <strong>Cost:</strong> ₹{roomType.cost} / person
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                margin: "6px 0",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Rooms</InputLabel>
                <Select
                  labelId={`rooms-label-${roomType.roomTypeId}`}
                  id={`rooms-${roomType.roomTypeId}`}
                  value={roomsSelected}
                  label="Rooms"
                  onChange={(e) => {
                    setRoomsSelected(e.target.value as string);
                  }}
                >
                  {[...Array(roomType.total_rooms)].map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {roomsSelected && (
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Guests</InputLabel>
                  <Select
                    labelId={`guests-label-${roomType.roomTypeId}`}
                    id={`guests-${roomType.roomTypeId}`}
                    value={guestsSelected}
                    label="Guests"
                    onChange={(e) => {
                      setGuestsSelected(e.target.value as string);
                    }}
                  >
                    {[
                      ...Array(Number(roomsSelected) * roomType.max_occupancy),
                    ].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {roomsSelected && guestsSelected && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    flexWrap: isMobile ? "wrap" : "nowrap",
                    margin: "6px 0",
                  }}
                >
                  <Typography
                    variant="h6"
                    color={COLOR_CONSTANTS.textGreyP}
                    fontWeight="bold"
                  >
                    Total Cost: ₹
                    {(
                      roomType.cost *
                      Number(guestsSelected) *
                      numberOfNights
                    ).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                margin: "6px 0",
              }}
            >
              <Button
                variant="contained"
                sx={primaryButtonStyle}
                onClick={resetRoomsAndGuests}
                disabled={!roomsSelected || !guestsSelected}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                sx={primaryButtonStyle}
                onClick={() => setOpenBookingDialog(true)}
                disabled={!roomsSelected || !guestsSelected}
              >
                Reserve
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {openBookingDialog && (
        <BookingDialog
          openDialog={openBookingDialog}
          setOpenDialog={setOpenBookingDialog}
          roomType={roomType}
          roomsSelected={roomsSelected}
          guestsSelected={guestsSelected}
        />
      )}
    </>
  );
}

export default RoomsCard;
