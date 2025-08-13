import { Request, Response } from "express";
import { ListScheduleSerivce } from "../../services/schedule/ListScheduleService";

class ListScheduleContorller{
    async handle( request: Request, response: Response){
        const user_id = request.user_id;

        const listSchedule = new ListScheduleSerivce();

        const schedule = await listSchedule.execute({ 
            user_id
        })

        return response.json(schedule);
    }
}

export { ListScheduleContorller}