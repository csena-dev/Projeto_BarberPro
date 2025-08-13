import prismaClient from "../../prisma";

interface DetailHaircut{
    haircut_id: string
}

class DetailHaircutService{
    async execute( { haircut_id }: DetailHaircut){

        const haircut = await prismaClient.haircut.findFirst({
            where:{
                id: haircut_id
            }
        })

        return haircut;

    }
}

export { DetailHaircutService }