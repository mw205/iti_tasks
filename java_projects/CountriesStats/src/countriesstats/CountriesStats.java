package countriesstats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CountriesStats {

    public static void main(String[] args) {
        List<City> cities = CSVRreader.readCities("Cities.csv");
        List<Country> countries = CSVRreader.readCountries("Countries.csv");
        // Find the highest populated city of each country
        System.out.println("### Highest Populated City per Country ###");

        Map<String, City> maxCityByCountry = new HashMap<>();

        cities.forEach(
                city -> maxCityByCountry.merge(
                        city.getCountryCode(),
                        city,
                        (existingCity, newCity) -> newCity.getPopulation() > existingCity.getPopulation() ? newCity : existingCity
                )
        );

        maxCityByCountry.forEach(
                (code, city) -> System.out.println(code + ": " + city.getName() + " (" + city.getPopulation() + ")")
        );

        //  Find the most populated country of each continent
        System.out.println("\n### Most Populated Country of Each Continent ###");
        Map<String, Country> maxCountryByContinent = new HashMap<>();

        countries.forEach(country
                -> maxCountryByContinent.merge(country.getContinent(), country, (existing, replacement)
                        -> replacement.getPopulation() > existing.getPopulation() ? replacement : existing
                )
        );
        maxCountryByContinent.forEach((continent, country)
                -> System.out.println(continent + ": " + country.getName() + " (" + country.getPopulation() + ")")
        );
        //  Find the highest populated capital city
        System.out.println("\n### Highest Populated Capital City ###");
        List<Integer> capitalIds = new ArrayList<>();
        countries.forEach(c -> {
            if (c.getCapital() != -1) {
                capitalIds.add(c.getCapital());
            }
        });
        City highestPopulatedCapital = cities.stream()
                .filter(city -> capitalIds.contains(city.getId()))
                .reduce(null, (currentMax, city) -> {
                    if (currentMax == null) {
                        return city;
                    }
                    return city.getPopulation() > currentMax.getPopulation() ? city : currentMax;
                });

        if (highestPopulatedCapital != null) {
            System.out.println(highestPopulatedCapital.getName() + " : "
                    + highestPopulatedCapital.getPopulation());
        }
    }

}
