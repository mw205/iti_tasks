package tempratureconverter;

public class Main {

    public static void main(String[] args) {
        float temp = 32;
        System.out.println("Temp is = " + temp + "C or " + new TempratureConverter().apply(temp) + "F");
    }
}
