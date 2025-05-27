import { RoomType } from "@/types/RoomType";
import { SetState } from "@/types/SetState";
import MobileScreen from "@/utils/mobile-screen";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export type GuestsAndRoomsState = {
    guests: { [key: string]: number },
    rooms: { [key: string]: number }
}

export interface GuestsAndRoomsPropsType {
    roomType: RoomType;
    guestsAndRooms: GuestsAndRoomsState;
    setGuestsAndRooms: SetState<GuestsAndRoomsState>;
}

const resetValue = {
    deluxe: 1,
    standard: 1,
    tent: 1,
}

export default function GuestsAndRooms({ guestsAndRoomsProps }: { guestsAndRoomsProps: GuestsAndRoomsPropsType }) {
    const isMobile = MobileScreen();

    return (
        <Box sx={{ display: 'flex', gap: '10px', width: isMobile ? '50%' : '25%' }}>
            <FormControl fullWidth>
                <InputLabel>Guests</InputLabel>
                <Select
                    labelId={`guests-${guestsAndRoomsProps.roomType.type}`}
                    id={`guests-${guestsAndRoomsProps.roomType.type}`}
                    value={guestsAndRoomsProps.guestsAndRooms.guests[guestsAndRoomsProps.roomType.type]?.toString() || "1"}
                    label="Guests"
                    onChange={handleGuestsAndRoomChange(guestsAndRoomsProps.setGuestsAndRooms, guestsAndRoomsProps.roomType.type, true)}
                    MenuProps={{
                        disablePortal: false,  // Ensures dropdown stays fixed
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                        },
                    }}
                >
                    {[...Array(
                        guestsAndRoomsProps.roomType.type === "deluxe" ? 6 : guestsAndRoomsProps.roomType.type === "standard" ? 4 : 2
                    )].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Rooms</InputLabel>
                <Select
                    labelId={`rooms-${guestsAndRoomsProps.roomType.type}`}
                    id={`rooms-${guestsAndRoomsProps.roomType.type}`}
                    value={guestsAndRoomsProps.guestsAndRooms.rooms[guestsAndRoomsProps.roomType.type]?.toString() || "1"}
                    label="Rooms"
                    onChange={handleGuestsAndRoomChange(guestsAndRoomsProps.setGuestsAndRooms, guestsAndRoomsProps.roomType.type, false)}
                    MenuProps={{
                        disablePortal: false,  // Ensures dropdown stays fixed
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                        },
                    }}
                >
                    {[...Array(
                        guestsAndRoomsProps.roomType.type === "deluxe" ? 2 : guestsAndRoomsProps.roomType.type === "standard" ? 6 : 3
                    )].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export function handleGuestsAndRoomChange(setGuestsAndRooms: SetState<GuestsAndRoomsState>, roomType: string, isGuests: boolean): (event: SelectChangeEvent) => void;
export function handleGuestsAndRoomChange(setGuestsAndRooms: SetState<GuestsAndRoomsState>): () => void;

export function handleGuestsAndRoomChange(setGuestsAndRooms: SetState<GuestsAndRoomsState>, roomType?: string, isGuests?: boolean) {
    if (roomType) {
        return (event: SelectChangeEvent) => {
            setGuestsAndRooms((prev: GuestsAndRoomsState) => {
                const guestsAndRoomsValue = isGuests ? {
                    guests: {
                        ...prev.guests,
                        [roomType]: Number(event.target.value)
                    },
                    rooms: {
                        ...prev.rooms
                    }
                } : {
                    guests: {
                        ...prev.guests,
                    },
                    rooms: {
                        ...prev.rooms,
                        [roomType]: Number(event.target.value)
                    }
                }
                return guestsAndRoomsValue;
            });
        };
    } else {
        return () => {
            setGuestsAndRooms({
                guests: resetValue,
                rooms: resetValue
            });
        };
    }
}