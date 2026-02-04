package customexception;

public class DataValidator {

    public void checkAge(int age) throws InvalidDataException {
        if (age < 0 || age > 150) {
            throw new InvalidDataException("Age " + age + " is not Valid!");
        }
        System.out.println("Age validated: " + age);
    }

    public void checkEmail(String email) throws InvalidDataException {
        if (email == null || !email.matches("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*"
                + "@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")) {
            throw new InvalidDataException("Invalid email format: " + email);
        }
        System.out.println("Email validated: " + email);
    }

    // Method 3: Checks score
    public void checkScore(double degree) throws InvalidDataException {
        if (degree < 0 || degree > 100) {
            throw new InvalidDataException("Score must be between 0 and 100.", 400);
        }
        System.out.println("Score validated: " + degree);
    }

}
