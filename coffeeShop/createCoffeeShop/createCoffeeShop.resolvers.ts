
import client from "../../src/client";
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { 
    name,
    latitude,
    longitude,
    categories
    }, 
{ loggedInUser }
) => {
    let categoriesObj = [];
    if (categories) {
        categoriesObj = categories.map((category) => ({
            where:  { category }, 
            create: { category }
        }))
    }
    return await client.coffeeShop.create({
        data: {
            name,
            latitude,
            longitude,
            user: {
                connect: {
                    id: loggedInUser.id
                }
            },
            ...(categoriesObj.length > 0 && {
                categories: {
                    connectOrCreate: categoriesObj
                }
            })
        }
    })
}; 

export default {
    Mutation: {
        createCoffeeShop: protectedResolver(resolverFn)
    }
}