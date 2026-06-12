export default interface WeatherObject {
    hour: number,
    temperature: number,
    timeOfDay: 'day' | 'night',
    status: 'clear' | 'cloudy' | 'rainy',
    pressure: number,
    humidity: number,
    windSpeed: number,
    windDirection: 'north'| 'north-west' | 'north-east' | 'south' | 'south-west' | 'south-east' | 'west' | 'east',
}