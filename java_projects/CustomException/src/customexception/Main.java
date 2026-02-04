/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package customexception;

/**
 *
 * @author user
 */
public class Main {

    public static void main(String[] args) {
        DataValidator validator = new DataValidator();
        try {
            validator.checkAge(25);

            validator.checkEmail("invalid-email-com");

            validator.checkScore(105.0);
           
        } catch (InvalidDataException e) {
            System.err.println("Caught Custom Exception: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("General error: " + e.getMessage());
        }
        finally {
            System.out.println("Validation Finished");
        }
    }
}
