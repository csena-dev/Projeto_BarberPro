import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/ListHaircutService";

class ListHaircutController{

    async handle(request: Request, response: Response){

        const user_id = request.user_id;
        const status = request.query.status as string;

        const listHaircuts = new ListHaircutService();

        const haircuts = await listHaircuts.execute({
            user_id,
            status
        })

        return response.json(haircuts);
    }
}

export { ListHaircutController };