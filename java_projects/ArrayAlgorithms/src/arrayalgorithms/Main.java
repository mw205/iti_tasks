package arrayalgorithms;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        int[] arr = {12, 45, 7, 89, 23, 56, 91, 34, 8, 67, 40, 15, 72, 6, 99}; // 15 element
        System.out.println("max element : " + new ArrayAlgorithms().getMax(arr));
        System.out.println("min element : " + new ArrayAlgorithms().getMin(arr));
        Arrays.sort(arr);
        int target = 99;
        System.out.println("index of target : " + target + " : " + new ArrayAlgorithms().search(target, arr));

    }
 // index should be 1-based 
}
