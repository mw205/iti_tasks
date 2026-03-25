package library;


public class BookFactory {
    public static BookInterface createBook(String type, String title) {
        return createBook(type, title, false);
    }

    public static BookInterface createBook(String type, String title, boolean isPremium) {
        Book newBook = null;
        switch (type) {
            case "Physical":
                newBook = new PhysicalBook(title);
                break;
            case "Historical":
                newBook = new HistoricalBook(title);
                break;
            case "Ebook":
                newBook = new EBook(title);
                break;
        }
        if (isPremium)
            return new PremiumBook(newBook);
        return newBook;
    }
}
