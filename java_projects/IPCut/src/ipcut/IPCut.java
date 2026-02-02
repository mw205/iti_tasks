package ipcut;

import java.util.StringTokenizer;

public class IPCut {

    String commandLine;

    public IPCut(String commandLine) {
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

    public int[] doIPCutUsingTokenizer() {
        StringTokenizer st = new StringTokenizer(commandLine, ".");
        int[] result = new int[st.countTokens()];
        int i = 0;
        while (st.hasMoreTokens()) {
            result[i] = Integer.parseInt(st.nextToken());
            i++;
        }
        return result;
    }
}
