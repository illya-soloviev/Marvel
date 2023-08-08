class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443';
    _apiKey = 'apikey=5b384501e48304843a7e8a1c83146bf3';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}/v1/public/characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/v1/public/characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;