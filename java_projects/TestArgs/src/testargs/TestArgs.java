/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package testargs;

/**
 *
 * @author user
 */
public class TestArgs {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        if (args.length != 0) {
            System.out.println("true value "+args[0]);
        }else{
            System.out.println("no provided args");
        }
    }

}
