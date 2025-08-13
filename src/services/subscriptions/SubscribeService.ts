import prismaClient from "../../prisma";
import Stripe from 'stripe';

interface SubscribeRequest{
    user_id: string;
}


class SubscribeService{
    async execute({ user_id}: SubscribeRequest){
        
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

        //buscar o usuario e cadastrar ele no stripe caso nao esteja cadastrado
        const findUser = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        let customerId = findUser.stripe_customer_id

        if(!customerId){
            //caso nao tenha criar como cliente no stripe
            const stripeCustomer = await stripe.customers.create({
                email: findUser.email
            })

            await prismaClient.user.update({
                where:{
                    id: user_id
                },
                data:{
                    stripe_customer_id: stripeCustomer.id
                }
            })

            customerId = stripeCustomer.id


        }

        //Inicializar o nosso checkout de pagamento
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: process.env.STRIPE_PRICE, quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return { sessionId: stripeCheckoutSession.id }

    }
}

export { SubscribeService };