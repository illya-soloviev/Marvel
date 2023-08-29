import { useHttp } from "../hooks.js/http.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443';
    const _apiKey = '5b384501e48304843a7e8a1c83146bf3';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/v1/public/characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/v1/public/characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? char.description.slice(0, 210) : 'There is no description for this character.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/v1/public/comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const _transformComic = (comicInfo) => {
        return {
            title: comicInfo.title,
            price: comicInfo.prices[0].price,
            thumbnail: comicInfo.thumbnail.path + '.' + comicInfo.thumbnail.extension
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics};
}

export default useMarvelService;