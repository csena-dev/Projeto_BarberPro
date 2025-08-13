import prismaClient from "../../prisma";

interface ListScheduleRequest{
    user_id: string;
}


class ListScheduleSerivce{
    async execute({ user_id }:ListScheduleRequest){
        const schedule = await prismaClient.service.findMany({
            where:{
                user_id: user_id
            },select:{
                id: true,
                customer: true,
                haircut: true
            }
        })

        return schedule;
    }
}

export { ListScheduleSerivce}