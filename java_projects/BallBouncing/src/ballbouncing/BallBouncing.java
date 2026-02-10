package ballbouncing;

import javax.swing.JFrame;

public class BallBouncing {
    
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setTitle("Bouncing Ball");
        frame.setContentPane(new BouncingBallPanel());
        frame.setSize(400, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
    
}
