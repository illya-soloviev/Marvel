import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comicData, setComicData] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);
    
    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comicData) => {
        setComicData(comicData);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comicData) ? <View comicData={comicData}/> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    );
}

const View = ({comicData}) => {
    const {thumbnail, title, description, pageCount, language, price} = comicData;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics/" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;