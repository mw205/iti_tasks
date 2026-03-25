package library;

public class Main {

    public static void main(String[] args) {
        BookFactory bookFactory = new BookFactory();
        LibraryService AlexLibrary = LibraryService.getInstance();// Singleton
        AlexLibrary.addBook(bookFactory.createBook("Physical", "Harry Potter"));
        AlexLibrary.addBook(bookFactory.createBook("Ebook", "Lord of the Rings"));
        User user = new User("John", true);
        AlexLibrary.borrowBook("Harry Potter", user);
        AlexLibrary.returnBook("Harry Potter");

    }
}
