import { SetState } from "@/types/SetState";
import SwimmingPoolService from "./swimmingPoolService";
import BarAndDrinkService from "./barAndDrinkService";
import ServiceNotFound from "./serviceNotFound";

export default function ServicesDialog({ service, openDialog, setOpenDialog }: { service: string | null, openDialog: boolean, setOpenDialog: SetState<boolean> }) {

    switch (service) {
        case 'swimmingPool':
            return (
                <SwimmingPoolService openDialog={openDialog} setOpenDialog={setOpenDialog}></SwimmingPoolService>
            );
        case 'barAndDrink':
            return (<BarAndDrinkService openDialog={openDialog} setOpenDialog={setOpenDialog} />);
        default:
            return (
                <ServiceNotFound openDialog={openDialog} setOpenDialog={setOpenDialog} />
            );
    }
}