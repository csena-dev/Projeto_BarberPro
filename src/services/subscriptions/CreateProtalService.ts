import prismaClient from "../../prisma"; 
import Stripe from 'stripe';

interface CreatePortalRquest{
    user_id: string;
}

class CreatePortalService{
    async execute( { user_id }: CreatePortalRquest ){

        const stripe = new Stripe(
            process.env.STRIPE_API_KEY,
            {
                apiVersion: "2025-07-30.basil",
                appInfo:{ 
                    name: 'barberpro',
                    version: '1'
                }
            }
        )

        const findUser =  await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        let sessionID  = findUser.stripe_customer_id;

        if(!sessionID){
            console.log("Nao tem ID");
            return { message: 'user not found'}
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessionID,
            return_url: process.env.STRIPE_SUCESS_URL
        })

        return { sessionId: portalSession.url }


    }
}

export { CreatePortalService };