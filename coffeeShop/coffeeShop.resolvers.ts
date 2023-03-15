import client from "../src/client"
export default {
    CoffeeShop: {
        user: ({userId }) => {
            return client.user.findUnique({
                where: {
                    id: userId
                }
            })
        },
        categories: ({ id }) => {
            return client.category.findMany({
                where: {
                    shops: {
                        some: {
                            id
                        }
                    }
                }
            })
        }
    }
}