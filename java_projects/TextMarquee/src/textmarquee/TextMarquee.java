package textmarquee;

import javax.swing.JFrame;

public class TextMarquee {
    
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setTitle("Marquee");
        frame.setContentPane(new MarqueePanel());
        frame.setSize(500, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
    
}
