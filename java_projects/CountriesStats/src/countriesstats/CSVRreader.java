package countriesstats;

import java.io.*;
import java.util.*;

public class CSVRreader {

    public static List<City> readCities(String path) {
        List<City> cities = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                int id = Integer.parseInt(data[0].trim());
                String name = data[1].trim();
                int population = Integer.parseInt(data[2].trim());
                String code = data[3].trim();

                cities.add(new City(id, name, population, code));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cities;
    }

    public static List<Country> readCountries(String path) {
        List<Country> countries = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                String code = data[0].trim();
                String name = data[1].trim();
                String continent = data[2].trim();
                int population = Integer.parseInt(data[3].trim());
                double surface = Double.parseDouble(data[4].trim());
                double gnp = Double.parseDouble(data[5].trim());
                int capitalId = Integer.parseInt(data[6].trim());

                countries.add(new Country(code, name, continent, population, surface, gnp, capitalId));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return countries;
    }
}
