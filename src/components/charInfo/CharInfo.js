import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [characterInfo, setCharacterInfo] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateCharacter();
        // eslint-disable-next-line
    }, [props.characterId]);
    
    const updateCharacter = () => {
        const {characterId} = props;
        if (!characterId) {
            return;
        }

        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharacterLoaded = (characterInfo) => {
        setCharacterInfo(characterInfo);
    }

    return (
        <div className="char__info">
            {setContent(process, View, characterInfo)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, id, comics} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    const comicsArr = [];
    for(let i = 0; i < comics.length; i++) {
        if (i > 9) {
            break;
        }
        let comicInfo = (
            <Link className="char__comics-item"
                key={i}
                to={'/comics/' + comics[i].resourceURI.slice(-5)}>
                {comics[i].name}
            </Link>
        );
        comicsArr.push(comicInfo);
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/characters/${id}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        {/* <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a> */}
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsArr.length === 0 ? 'There are no comics with this character.' : null}
                {comicsArr}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    characterId: PropTypes.number
};

export default CharInfo;