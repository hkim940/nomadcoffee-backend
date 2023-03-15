import client from "../../src/client";

export default {
    Query: {
        seeCategories: (_, { page }) => {
            return client.category.findMany({
                take: 2,
                skip: (page - 1) * 2
            })
        }
    },
    Category: {
        totalShops: (parent) => {
            console.log(parent);
            return client.coffeeShop.count({
                where: {
                    categories: {
                        some: { 
                            id: parent.id
                        }
                    }
                }
            })
        }
    }
}