import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [characterInfo, setCharacterInfo] = useState({});
    const {getCharacter, clearError, process, setProcess} = useMarvelService();
    
    useEffect(() => {
        updateCharacter();
        // const timerId = setInterval(updateCharacter, 60000);

        return () => {
            // clearInterval(timerId);
        };
        // eslint-disable-next-line
    }, []);
    
    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        clearError();
        getCharacter(id)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharacterLoaded = (characterInfo) => {
        setCharacterInfo(characterInfo);
    }

    return (
        <div className="randomchar">
            {setContent(process, View, characterInfo)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, id} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <Link to={`/characters/${id}`} className="button button__main">
                        <div className="inner">homepage</div>
                    </Link>
                    {/* <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a> */}
                </div>
            </div>
        </div>
    );
}

export default RandomChar;