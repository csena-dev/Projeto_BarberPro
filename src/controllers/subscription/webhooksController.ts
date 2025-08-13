import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from '../../utils/stripe'
import { saveSubscription } from '../../utils/manageSubscription'

class WebhooksController {
    async handle( request: Request, response: Response){

        let event: Stripe.Event = request.body;

        const signature = request.headers['stripe-signature']
        let endpointSecret = 'whsec_0128e67091b896daaca7ab7598a238f26232e99d17e2cf6a3c1266e84fc5d6ae';

        try{
            event = stripe.webhooks.constructEvent( request.body, signature, endpointSecret )
        }catch(err){
            return response.status(400).send(`webhook error: ${err.message}`);
        }


        switch(event.type){


            //Caso cliente cancele a assinatura, entao deletar a assinatura
            case 'customer.subscription.deleted':
               
                const payment = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                )
                break;

            // Caso cliente tenha uma atualizacao na assinatura
            case 'customer.subscription.updated':

                const paymentIntent = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    paymentIntent.id,
                    paymentIntent.customer.toString(),
                    false,
                    false,
                )
                break;

            //Criar a assinatura por que foi pago com suceso.    
            case 'checkout.session.completed':

                const checkoutSession = event.data.object as Stripe.Checkout.Session

                await saveSubscription(
                    checkoutSession.subscription.toString(),
                    checkoutSession.customer.toString(),
                    true,
                    false
                )
                break;

            default:
                console.log(`Evento desconhecido: ${event.type} `)

        }

        response.send();

    }
}

export { WebhooksController };