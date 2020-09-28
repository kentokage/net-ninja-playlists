// * 3 responsibilities
// 1st define types
// 2nd define relationships between types
// 3rd defining root queries, how do you initialing jump into the graph to get data

// dummy data
// var books = [
// 	{ name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
// 	{ name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
// 	{ name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
// 	{ name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
// 	{ name: "The Colour of Magic", genre: "Sci-Fi", id: "5", authorId: "3" },
// 	{ name: "The Light Fantastic", genre: "Sci-Fi", id: "6", authorId: "3" },
// ];

// var authors = [
// 	{ name: "Patrick Rothfuss", age: 44, id: "1" },
// 	{ name: "Brandon Sanderson", age: 42, id: "2" },
// 	{ name: "Terry Pratchett", age: 66, id: "3" },
// ];

const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull, // for required
} = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		// needs to be a function, needs to be wrapped, important for different types
		// this way it is thunking it, resolves issue with chicken or the egg first with Book and Author
		// won't run the fields code until the parent code is run, so we won't run into catch 22 issue
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return authors.find((author) => author.id === parent.authorId);
				return Author.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		// needs to be a function, needs to be wrapped, important for different types
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books.filter((book) => book.authorId === parent.id);
				return Book.find({ authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from database / other source (parent is parent relationship)
				// return books.find((book) => book.id === args.id);
				return Book.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return authors.find((author) => author.id === args.id);
				return Author.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books;
				return Book.find({}); // empty {} means all matched
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;
				return Author.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save(); // mongoose knows how to save the model, it also returns the newly created record
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});

				return book.save();
			},
		},
	},
});

/*
book(id: "2") {
	name
	genre
}
*/

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
