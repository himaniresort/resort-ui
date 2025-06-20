import { SetState } from "@/types/SetState";
import SwimmingPoolService from "./swimmingPoolService";
import BarAndDrinkService from "./barAndDrinkService";
import ServiceNotFound from "./serviceNotFound";
import CateringService from "./cateringService";
import FunActivitiesSection from "./funActivities";
import TravelPlansSection from "./travelPlanSection";
import HireDriverService from "./hireDriverService";

export default function ServicesDialog({ service, openDialog, setOpenDialog }: { service: string | null, openDialog: boolean, setOpenDialog: SetState<boolean> }) {

    switch (service) {
        case 'swimmingPool':
            return (
                <SwimmingPoolService openDialog={openDialog} setOpenDialog={setOpenDialog}></SwimmingPoolService>
            );
        case 'barAndDrink':
            return (<BarAndDrinkService openDialog={openDialog} setOpenDialog={setOpenDialog} />);
        case 'cateringService':
            return (<CateringService openDialog={openDialog} setOpenDialog={setOpenDialog} />)
        case 'funActivities':
            return (<FunActivitiesSection openDialog={openDialog} setOpenDialog={setOpenDialog} />)
        case 'travelPlan':
            return (<TravelPlansSection openDialog={openDialog} setOpenDialog={setOpenDialog} />)
        case 'hireDriver':
            return (<HireDriverService openDialog={openDialog} setOpenDialog={setOpenDialog} />)
        default:
            return (<ServiceNotFound openDialog={openDialog} setOpenDialog={setOpenDialog} />);
    }
}