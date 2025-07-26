import { Grid } from "@mui/material";
import RoomTypeDialog from "./RoomTypeDialog";
import { useState } from "react";
import MobileScreen from "@/utils/mobile-screen";
import useRoomTypeStore from "@/store/RoomType";

import { RoomType } from "@/types/RoomType";
import RoomsCard from "./RoomsCard";

export default function RoomTypeComponent() {
  const isMobile = MobileScreen();
  const { roomTypeData } = useRoomTypeStore();

  const [openRoomInfoDialog, setOpenRoomInfoDialog] = useState(false);
  const [roomInfo, setRoomInfo] = useState<RoomType | null>(null);

  const handleRoomInfoClick = (roomType: RoomType) => {
    setOpenRoomInfoDialog(true);
    setRoomInfo(roomType);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        mt={0}
        sx={{
          flexDirection: isMobile ? "column" : "row", // Column for mobile, row for desktop
          width: "100%", // Full width for both
          flexWrap: isMobile ? "nowrap" : "wrap", // Allow wrapping on desktop
        }}
      >
        {roomTypeData.map((roomType, index) => {
          return (
            <RoomsCard
              key={index}
              roomType={roomType}
              handleRoomInfoClick={handleRoomInfoClick}
            />
          );
        })}
      </Grid>
      <RoomTypeDialog
        roomType={roomInfo}
        openDialog={openRoomInfoDialog}
        setOpenDialog={setOpenRoomInfoDialog}
      />
    </>
  );
}
