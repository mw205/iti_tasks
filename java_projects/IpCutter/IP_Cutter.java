
class IpCutter {
    String commandLine;

    public IpCutter(String commandLine) {
        this.commandLine = commandLine;
    }

    public int[] doIpCut() {
        String[] ipParts = commandLine.split("\\.");
        int[] result = new int[ipParts.length];
        for (int i = 0; i < ipParts.length; i++) {
            int elem = Integer.parseInt(ipParts[i]);
            result[i] = elem;
        }
        return result;
    }
}
