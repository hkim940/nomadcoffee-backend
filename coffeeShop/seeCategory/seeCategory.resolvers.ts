import client from "../../src/client"
export default {
    Query: {
        seeCategory: async(_, { id, page }) => {
            const coffeeShop = await client.category.findUnique({
                where: {
                    id
                }
            }).shops({
                take: 2,
                skip: (page - 1) * 2
            })
            if (!coffeeShop) return {
                ok: false,
                error: "Coffee Shop Not Found"
            }
            return {
                ok: true,
                shops: coffeeShop
            }
        }
    }
}