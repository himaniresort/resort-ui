import { useMediaQuery, useTheme } from "@mui/material";

export default function MobileScreen() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return isMobile;
}
