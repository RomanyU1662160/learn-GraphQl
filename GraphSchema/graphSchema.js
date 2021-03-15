const { GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID, GraphQLNonNull } = require("graphql");


const Author = require("../MonogoSchema/authorSchema");
const Book = require("../MonogoSchema/bookSchema");

/* steps:
- Define each schema with(name , fields);
- define the RootQuery schema with all endpoints and the resolve functions
- create a new instance of the GraphQLSchema and add the { query : RootQuery} 
- export the new GraphQLSchema to use in the express-graphql server

*/
const BookSchema = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        year: { type: GraphQLInt },
        authorId: {
            type: AuthorSchema,
            resolve: async (parent, args) => {
                let author = await Author.findById(parent.authorId);   // use the parent id (book) to get the author 
                return author;
            }
        }
    })
})



const AuthorSchema = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookSchema),
            resolve: async (parent, args) => {
                let books = await Book.find({ authorId: parent.id })
                return books
            }
        }
    })
})

// create the RootQuerySchema

const RootQuery = new GraphQLObjectType({
    name: "RouteQueryType",
    fields: {
        book: {
            type: BookSchema,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                await Book.findById("604e7a5dd0c9d154990f1102");
                return Book.findById(args.id)
            }
        },

        books: {
            type: new GraphQLList(BookSchema),
            resolve: async (parents, args) => {
                return await Book.find()
            }
        },

        author: {
            type: AuthorSchema,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                return Author.findById(args.id)
            }
        },

        authors: {
            type: new GraphQLList(AuthorSchema),
            resolve: async (parent, argd) => {
                return Author.find();
            }
        }
    }
})

// create the Mutation


const Mutation = new GraphQLObjectType({
    name: "mutations",
    fields: {
        addNewAuthor: {
            type: AuthorSchema,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // required
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                const { name, email } = args;
                let newAuthor = new Author({ name, email });
                await newAuthor.save();
                return newAuthor
            }
        },
        addNewBook: {
            type: BookSchema,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },  // make it required 
                year: { type: GraphQLInt },
                genre: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const { title, year, genre } = args;
                let newBook = new Book({ title, year, genre });
                await newBook.save();
                return newBook
            }
        },

        UpdateAuthor: {
            type: AuthorSchema,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const { id, name, email } = args;
                let updatedAuthor = await Author.findByIdAndUpdate(id, { name, email }, { new: true });
                return updatedAuthor
            }


        }

    }

})



const myGraphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

module.exports = myGraphQLSchema;