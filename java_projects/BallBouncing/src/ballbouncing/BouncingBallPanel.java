package ballbouncing;

import java.awt.Color;
import java.awt.Graphics;
import javax.swing.JPanel;

public class BouncingBallPanel extends JPanel {

    private int x = 0, y = 0, dx = 5, dy = 5, ballSize = 25;

    public BouncingBallPanel() {
        this.setBackground(Color.CYAN);
        new Thread(new BouncingBallRunnable()).start();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.red);
        g.fillOval(x, y, ballSize, ballSize);
    }

    private class BouncingBallRunnable implements Runnable {

        @Override
        public void run() {
            while (true) {
                try {
                    x += dx;
                    y += dy;
                    if (x < 0 || x + ballSize > getWidth()) {
                        dx = -dx;
                    }
                    if (y < 0 || y + ballSize > getHeight()) {
                        dy = -dy;
                    }

                    repaint();
                    Thread.sleep(20);
                } catch (InterruptedException interruptedException) {
                    System.getLogger(BouncingBallPanel.class.getName()).log(System.Logger.Level.ERROR, (String) null, interruptedException);
                }
            }

        }

    }

}
