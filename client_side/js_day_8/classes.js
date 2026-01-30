class Country {
  constructor(
    name,
    continent,
    population,
    currency,
    photo,
    language,
    neighbour
  ) {
    this.name = name;
    this.continent = continent;
    this.population = population;
    this.currency = currency;
    this.photo = photo;
    this.language = language;
    this.neighbour = neighbour
  }
  setCountryDetailsFromJson(json) {
    this.name = json["name"];
    this.continent = json["region"];
    this.population = json["population"];
    this.currency = json["currencies"][0]["name"];
    this.photo = json["flag"];
    this.language = json["languages"][0]["name"];
    this.neighbour = new Country()
  }
}
