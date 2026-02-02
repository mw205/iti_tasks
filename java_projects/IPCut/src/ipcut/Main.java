package ipcut;

public class Main {

    public static void main(String[] args) {
        String commandLine = "192.168.1.1";
        IPCut ipCutter = new IPCut(commandLine);
        int[] result = new int[4];
        System.out.println("The output of IP Cut : ");
        result = ipCutter.doIpCut();
        for (int i = 0; i < result.length; i++) {
            System.out.println(result[i]);
        }
        commandLine = "10.10.10.1";
        System.out.println("The output of IP Cut using String Tokenizer : ");
        ipCutter = new IPCut(commandLine);
        result = ipCutter.doIPCutUsingTokenizer();
        for (int i = 0; i < result.length; i++) {
            System.out.println(result[i]);
        }
    }

}
