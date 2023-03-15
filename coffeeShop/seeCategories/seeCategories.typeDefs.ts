export default `#graphql 
    type Query {
        seeCategories( page: Int! ): [Category]
    }
`