import { useState, useEffect } from 'react';
import {Link} from "react-router-dom/cjs/react-router-dom";
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onComicsRequest(offset, true);
    }, []);

    const onComicsRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const renderComics = (comicsArr) => {
        const comics = comicsArr.map((comicInfo, comicIndex) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (comicInfo.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li className="comics__item"
                    key={comicIndex}>
                    <Link to={`/comics/${comicInfo.id}`}>
                        <img src={comicInfo.thumbnail} alt="comic"
                             className="comics__item-img"
                             style={imgStyle}/>
                        <div className="comics__item-name">{comicInfo.title}</div>
                        <div className="comics__item-price">{comicInfo.price}$</div>
                    </Link>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        );
    }

    const comics = renderComics(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comics}
            <button className="button button__main button__long"
                    disabled={newComicsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onComicsRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;