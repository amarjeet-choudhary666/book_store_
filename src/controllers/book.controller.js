import {asyncHandler} from "../util/asyncHandler.js";
import {ApiError} from "../util/apiError.js";
import {Book} from "../model/index.js";
import {ApiResponse} from "../util/apiResponse.js";

const createBook = asyncHandler(async (req, res) => {

    const {title, author, price} = req.body;

    if (
        ! title || !author || !price
    ) {
        throw new ApiError(400, "All fields are required")
    }


    const existedBook = await Book.findOne({title: title})

    if (existedBook){
        throw new ApiError(400, "Book already exists")
    }

    const book = await Book.create({
        title: title.toLowerCase(),
        author: author.toLowerCase(),
        price: price
    })

    if (!book){
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, createBook, book,  "Book created successfully")
    )
})


const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find(); // Fetch all books from MongoDB

    res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    );
});

const updateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, author, price } = req.body;

    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.price = price ?? book.price;

    const updatedBook = await book.save();

    res.status(200).json(
        new ApiResponse(200, updatedBook, 'Book updated successfully')
    );
});

const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    await book.deleteOne();

    res.status(200).json({
        success: true,
        book,
        message: 'Book deleted successfully',
    });
});

export {
    createBook,
    getBooks,
    updateBook,
    deleteBook
}