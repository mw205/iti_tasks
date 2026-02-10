package digitalclock;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class DigitalClock {

    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setTitle("Digital Clock");
        JPanel clockPanel = new ClockPanel();
        frame.setContentPane(clockPanel);
        frame.setSize(400, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }

}
