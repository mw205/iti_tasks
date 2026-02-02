package countwords;

public class Main {

    public static void main(String[] args) {
        String sentence = "Java is the best, Java is great";
        String word = "java";
        WordCount wc = new WordCount();
        int count = wc.countUsingContain(sentence, word);
        System.out.println("Count of " + word + " : " + count + " using contain ");
        count = wc.countUsingIndexOf(sentence, word);
        System.out.println("Count of " + word + " : " + count + " using index of ");
    }
    // ensure that the word is a real word
    // ensure that it ignores the case 
}
