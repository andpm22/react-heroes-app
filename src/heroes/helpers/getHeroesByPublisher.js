import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
    
    const validatePublishers = ['DC Comics', 'Marvel Comics'];

    if (!validatePublishers.includes(publisher)){
        throw new Error(`${publisher} is not a valid publisher from our list`);
    }
    return heroes.filter(hero => hero.publisher === publisher);
}