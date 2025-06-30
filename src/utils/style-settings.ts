import { COLOR_CONSTANTS } from "@/constants/colors-constants"

export const dialogBackDropProp = {
    backdrop: {
        sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
    },
}

export const hideScrollBar = {
    "&::-webkit-scrollbar": {
        display: "none" // Hide scrollbar in Chrome and Safari
    }
}

export const dialogButtonStyle = {
    color: "darkslategrey",
    "&:hover": {
        color: "black",
    }
}

export const primaryButtonStyle = {
    backgroundColor: COLOR_CONSTANTS.buttonPrimary,
    "&:hover": { backgroundColor: COLOR_CONSTANTS.buttonPrimaryHover },
}