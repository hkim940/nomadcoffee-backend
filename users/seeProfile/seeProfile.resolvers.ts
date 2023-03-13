import client from "../../src/client";

export default {
    Query: {
        seeProfile: (_, { username }) => {
            return client.user.findUnique({ 
                where: { 
                    username 
                }
                /**
                 *  Relationship 같은 경우에는 Prisma 가 default 로 include 를 하지 않는다
                    because it can get expensive to show all the information if the list gets too big
                    그래서 만약에 Query 에서 relationship 을 보고 싶다면, explicity 하게 include 하라고 정의한다
                 */

                // include: {
                //     followers: true,
                //     following: true
                // }
            })
        }
    }
}