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

    constructor() {
        // TODO Map of 2 trips
        // 'paris' --> price = 100
        // 'rio-de-janeiro' --> price = 800)
        // no price for 'nantes'
        this.tripServiceMap = new Map();
        this.tripServiceMap.set("paris", 100)
        this.tripServiceMap.set("rio-de-janeiro", 800)
    }

    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de
                //la recherche
                if (this.tripServiceMap.has(tripId)) {
                    resolve(this.tripServiceMap.get(tripId))
                } else {
                    reject("No price for trip id " + tripId)
                }
            }, 2000)
        });
    }
}

const tripservice = new TripService();
const priceservice = new PriceService();

tripservice.findByName("Paris")
    .then(tripTrouve => console.log('Trip found ', tripTrouve))
    .catch((err) => console.log(err))

tripservice.findByName("Toulouse")
    .then(tripTrouve => console.log('Trip found: ', tripTrouve))
    .catch((err) => console.log(err))

tripservice.findByName("Rio de Janeiro")
    .then(tripTrouve => priceservice.findPriceByTripId(tripTrouve.id))
    .then(price => console.log('Price found:', price))
    .catch(error => console.log(error));

tripservice.findByName("Nantes")
    .then(tripTrouve => priceservice.findPriceByTripId(tripTrouve.id))
    .then(price => console.log('Price found:', price))
    .catch(error => console.log(error));

tripservice.findByName("Nantes")
    .then(function (tripTrouve) { return priceservice.findPriceByTripId(tripTrouve.id);})
    .then(price => console.log('Price found:', price))
    .catch(error => console.log(error));
