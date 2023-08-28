import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(10);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    
    const {loading, error, getAllComics} = useMarvelService();

    const renderComics = (comicsArr) => {
        const comics = comicsArr.map((comicInfo, comicIndex) => {
            return (
                <li className="comics__item"
                    key={comicIndex}>
                    <a href="#">
                        <img src={comicInfo.thumbnail} alt="comic"
                             className="comics__item-img"
                             style={{'objectFit' : 'cover'}}/>
                        <div className="comics__item-name">{comicInfo.title}</div>
                        <div className="comics__item-price">{comicInfo.price}$</div>
                    </a>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        );
    }

    const comics = renderComics();
    const spinner = loading && !newCharactersLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {comics}
            {spinner}
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