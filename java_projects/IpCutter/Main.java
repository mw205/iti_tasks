
class Main {

    public static void main(String[] args) {
        String commandLine = "192.168.1.1";
        IpCutter ipCutter = new IpCutter(commandLine);
        System.out.println("The output of IP Cut : ");
        int[] result = ipCutter.doIpCut();
        for (int i = 0; i < result.length; i++) {
            System.out.println(result[i]);
        }
    }
}
