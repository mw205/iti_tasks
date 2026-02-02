/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package testargs2;

/**
 *
 * @author user
 */
public class TestArgs2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        for (int i=0; i <Integer.parseInt(args[0]); i++) {
            System.out.println(args[1]);
        }
    }
    
}
