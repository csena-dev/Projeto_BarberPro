import prismaClient from "../../prisma";

interface ScheduleRequest{
    
    user_id: string;
    haircut_id: string;
    customer: string;
}


class NewScheduleService{
    async execute({customer, user_id, haircut_id}: ScheduleRequest){

        if(customer === '' || haircut_id === ''){
            throw new Error("Error schedule new service");
        }

        const schedule = await prismaClient.service.create({
            data:{
                customer: customer,
                haircut_id: haircut_id,
                user_id: user_id
            }
        })

        return schedule;
    }
}

export { NewScheduleService };