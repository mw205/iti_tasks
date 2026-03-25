package library;

public abstract class BookDecorator implements BookInterface {

    protected BookInterface decoratedBook;

    public BookDecorator(BookInterface decoratedBook) {
        this.decoratedBook = decoratedBook;
    }

    @Override
    public void borrowBook(User user) {
        decoratedBook.borrowBook(user);
    }

    @Override
    public void returnBook() {
        decoratedBook.returnBook();
    }

}