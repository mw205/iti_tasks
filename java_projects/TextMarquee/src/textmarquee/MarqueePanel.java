package textmarquee;

import java.awt.Color;
import java.awt.Graphics;
import javax.swing.JPanel;

public class MarqueePanel extends JPanel {

    private int xPosition = 0;
    private int yPosition = 100;

    public MarqueePanel() {
        this.setBackground(Color.CYAN);
        new Thread(new MarqueeRunnable()).start();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawString("Mohamed Waleed", xPosition, yPosition);
    }

    class MarqueeRunnable implements Runnable {

        @Override
        public void run() {
            while (true) {
                try {
                    xPosition -= 10;
                    if (xPosition < getWidth()) {
                        xPosition = 0;
                    }
                    repaint();
                    Thread.sleep(100);
                } catch (InterruptedException interruptedException) {
                    System.getLogger(MarqueePanel.class.getName()).log(System.Logger.Level.ERROR, (String) null, interruptedException);

                }
            }
        }
    }
}
