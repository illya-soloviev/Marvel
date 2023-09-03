import { useHttp } from "../hooks.js/http.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=5b384501e48304843a7e8a1c83146bf3';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
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
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getComic = async (comicId) => {
		const res = await request(`${_apiBase}comics/${comicId}?${_apiKey}`);
		return _transformComic(res.data.results[0]);
	};

    const _transformComic = (comicData) => {
        return {
			id: comicData.id,
			title: comicData.title,
			description: comicData.description || "There is no description",
			pageCount: comicData.pageCount
				? `${comicData.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comicData.thumbnail.path + "." + comicData.thumbnail.extension,
			language: comicData.textObjects[0]?.language || "en-us",
			price: comicData.prices[0].price
				? `${comicData.prices[0].price}$`
				: "not available"
        }
    }

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic
    };
}

export default useMarvelService;