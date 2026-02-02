package countwords;

public class WordCount {



    public int countUsingIndexOf(String sentence, String word) {
        int count = 0;
        int index;

        while ((index = sentence.indexOf(word)) != -1) {
            count++;
            sentence = sentence.substring(index + word.length());
        }
        return count;
    }

    public int countUsingContain(String sentence, String word) {
        int count = 0;
        while (sentence.contains(word)) {
            count++;
            sentence = sentence.replaceFirst(word, "");
        }
        return count;
    }
}
