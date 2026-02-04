
package tempratureconverter;

import java.util.function.Function;

public class TempratureConverter implements Function<Float, Float> {

    @Override
    public Float apply(Float t) {
        return (float) ((t * 1.8) + 32);
    }
}
