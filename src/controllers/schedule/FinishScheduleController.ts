import { Request, Response } from "express";
import { FinishScheduleSevice } from "../../services/schedule/FinishScheduleService";

class FinishScheduleController{
    async handle(request: Request, response: Response){
        
        const user_id = request.user_id;
        const schedule_id = request.query.schedule_id as string;

        const finishSchedule = new FinishScheduleSevice();

        const finish = await finishSchedule.execute({
            user_id,
            schedule_id
        })

        return response.json(finish)
    }
}

export { FinishScheduleController}