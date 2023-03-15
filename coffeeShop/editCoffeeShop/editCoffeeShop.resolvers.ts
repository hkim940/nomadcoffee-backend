import client from "../../src/client";
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async(_, { 
    id,
    name,
    latitude,
    longitude,
    categories
},
{   
    loggedInUser 
}
) => {
    let categoriesObj = [];
    const oldCoffeeShop = await client.coffeeShop.findFirst({
        where: {
            id,
            userId: loggedInUser.id
        },
        include: {
            categories: {
                select: {
                    category: true
                }
            }
        }
    })
    if (categories) {
        categoriesObj = categories.map((category) => ({
            where: { category },
            create: { category }
        }))
    }
    if (!oldCoffeeShop) {
        return {
            ok: false,
            error: "Coffee Shop not Found"
        }
    }
    const updated = await client.coffeeShop.update({
        where: {
            id
        },
        data: {
            ...(name && { name }),
            ...(longitude && { longitude }),
            ...(latitude && { latitude }),
            categories: {
                disconnect: oldCoffeeShop.categories,
                connectOrCreate: categoriesObj
            }
        }
    })
    return {
        ok: true,
        coffeeShop: updated
    }
}

export default {
    Mutation: {
        editCoffeeShop: protectedResolver(resolverFn)
    }
}