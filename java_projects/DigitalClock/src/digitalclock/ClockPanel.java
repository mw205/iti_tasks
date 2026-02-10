package digitalclock;

import java.awt.Color;
import java.awt.Graphics;
import java.util.Date;
import javax.swing.JPanel;

public class ClockPanel extends JPanel {

    public ClockPanel() {
        this.setBackground(Color.CYAN);
        new Thread(new ClockRunnable()).start();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        String timeString = new Date().toString();
        g.drawString(timeString, 100, 100);
    }

    private class ClockRunnable implements Runnable {

        @Override
        public void run() {
            while (true) {
                try {
                    repaint();
                    Thread.sleep(1000);
                } catch (InterruptedException ex) {
                    System.getLogger(ClockPanel.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
                }

            }
        }
    }

}
