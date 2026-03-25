package library;

public class PremiumBook extends BookDecorator {
    public PremiumBook(BookInterface decoratedBook) {
        super(decoratedBook);
    }

    @Override
    public void borrowBook(User user) {
        super.borrowBook(user);
    }

    @Override
    public void returnBook() {
        super.returnBook();
    }

    public void addExtraBorrowingDays(User user) {
        System.out.println("Premium Benefit:\n" +
                "Added 7 extra borrowing days for premium user " + user.getName());
    }
}
