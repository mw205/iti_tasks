package countriesstats;

public class Country {

    private String code;
    private String name;
    private String continent;
    private double surfaceArea;
    private int population;
    private double gnp;
    private int capital;

    public Country(String code, String name, String continent, int population, double surfaceArea, double gnp, int capitalId) {
        this.code = code;
        this.name = name;
        this.continent = continent;
        this.population = population;
        this.surfaceArea = surfaceArea;
        this.gnp = gnp;
        this.capital = capitalId;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getContinent() {
        return continent;
    }

    public double getSurfaceArea() {
        return surfaceArea;
    }

    public int getPopulation() {
        return population;
    }

    public double getGnp() {
        return gnp;
    }

    public int getCapital() {
        return capital;
    }

    @Override
    public String toString() {
        return "Country{"
                + "code='" + code + '\''
                + ", name='" + name + '\''
                + ", continent='" + continent + '\''
                + ", surfaceArea=" + surfaceArea
                + ", population=" + population
                + ", gnp=" + gnp
                + ", capital=" + capital
                + '}';
    }

}
