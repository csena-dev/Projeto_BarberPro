import prismaClient from "../../prisma";

interface FinishRequest{
    user_id: string;
    schedule_id: string;
}

class FinishScheduleSevice{
    async execute({user_id, schedule_id}: FinishRequest){

        if( schedule_id === ''|| user_id === ''){
            throw new Error("Error")
        }

        try{

            const belognsToUser = await prismaClient.service.findFirst({
                where:{
                    id: schedule_id,
                    user_id: user_id
                }
            })

            if(!belognsToUser){
                throw new Error("Not Authorized")
            }

            await prismaClient.service.delete({
                where:{
                    id: schedule_id
                    
                }
            })

            return { message: "Finalizado com sucesso!"}

        }catch(err){
            console.log(err);
            throw new Error(err);
        }


    }
}

export { FinishScheduleSevice}