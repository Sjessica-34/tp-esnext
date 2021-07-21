let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
// citiesId = [];
citiesId.push("tokyo")
console.log(citiesId);

function getWeather(cityId) {
    let city = cityId?.toUpperCase();
    let temperature = 20;

    return {city, temperature};
}

let weather = getWeather("paris");
console.log(weather);

let {city, temperature} = weather;
console.log(city);
console.log(temperature);

const [
    paris, nyc, ...cities
 ] = citiesId;

console.log(paris);
console.log(nyc);
console.log(cities.length);

class Trip {
    id;
    name;
    imgUrl;
    _price;

    constructor(id, name, imgUrl){
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }

    getPrice() {
        return this._price;
    }

    setPrice(price) {
        this._price = price;
    }

    toString(){
        return `Trip [${this.id}, ${this.name}, ${this.imgUrl}, ${this._price}]`;
    }

    static getDefaultTrip(){
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
}

const parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());

parisTrip.setPrice(100);
parisTrip.price = 200; //vérifie la validité du private
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

class FreeTrip extends Trip {
    constructor(id, name, imgUrl){
        super(id, name, imgUrl);
        this._price = 0;
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
console.log(freeTrip.toString());

class TripService {
    set;

    constructor() {
        this.set = new Set([
            new Trip("paris", "Paris", "img/paris.jpg"),
            new Trip("nantes", "Nantes", "img/nantes.jpg"),
            new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg")
        ]);
    }


    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                this.set.forEach((key, value, setElement) => {
                    if (value.name == tripName){
                        return resolve(value);
                    }
                });
                return reject("No trip with name " + tripName);
            }, 2000)
        });
    }
}
class PriceService {
    map;

    constructor() {
        this.map = new Map([
            ['paris', 100],
            ['rio-de-janeiro', 800]
          ])
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {
    
            setTimeout(() => {
                if (this.map.has(tripId)){
                    return resolve(this.map.get(tripId));
                };
                return reject("No price found for id " + tripId);
            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

console.log(tripService.set);
console.log(priceService.map);

tripService.findByName("Paris")
.then((value) => console.log(value))
.catch((value) => console.log(value));

tripService.findByName("Toulouse")
.then((value) => console.log(value))
.catch((value) => console.log(value));


tripService.findByName("Rio de Janeiro")
.then((value) => 
    priceService.findPriceByTripId(value.id)
        .then((price) => console.log(price))
        .catch((price) => console.log(price))
)
.catch((value) => console.log(value));

tripService.findByName("Nantes")
.then((value) => 
    priceService.findPriceByTripId(value.id)
        .then((price) => console.log(price))
        .catch((price) => console.log(price))
)
.catch((value) => value);