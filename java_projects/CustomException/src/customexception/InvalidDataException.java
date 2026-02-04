package customexception;

public class InvalidDataException extends RuntimeException {

    private int statusCode;

    public InvalidDataException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public InvalidDataException(String message) {
        super(message);
        this.statusCode = 400;
    }
    
//    @Override
//    String getMessage(){
//        return super.getMessage()+ "status code : " + statusCode;
//    }
}
