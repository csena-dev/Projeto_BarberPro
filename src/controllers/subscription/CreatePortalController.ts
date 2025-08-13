import { Request, Response } from 'express'
import { CreatePortalService } from '../../services/subscriptions/CreateProtalService'


class CreatePortalController{
    async handle( request: Request, response: Response){

        const user_id = request.user_id

        const createPortal = new CreatePortalService();

        const portal = await createPortal.execute({
            user_id
        })

        return response.json(portal);


    }
}

export { CreatePortalController }