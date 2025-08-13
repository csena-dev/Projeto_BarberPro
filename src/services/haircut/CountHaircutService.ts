import prismaClient from "../../prisma";

interface CountRequest{
    user_id: string;
}


class CountHaircutService{
    async execute({user_id}: CountRequest ){
        
        const count = await prismaClient.haircut.count({
            where:{
               user_id: user_id 
            }
        })

        return count;
    }
}

export { CountHaircutService };