import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charactersList, setCharactersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newCharactersLoading, setNewCharactersLoading] = useState(false);
    const [charactersEnded, setCharactersEnded] = useState(false);
    
    const marvelService = new MarvelService();

    useEffect(() => {
        onCharactersRequest();
    }, []);

    const onCharactersRequest = (offset) => {
        onCharListLoading();

        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewCharactersLoading(true);
    }

    const onCharListLoaded = (newCharactersList) => {
        let ended = false;
        if (newCharactersList.length < 9) {
            ended = true;
        }

        setCharactersList(charactersList => [...charactersList, ...newCharactersList]);
        setLoading(false);
        setNewCharactersLoading(false);
        setOffset(offset => offset + 9);
        setCharactersEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const charactersCardsRefs = useRef([]);

    const changeActiveCharacterCard = (characterCardIndex) => {
        charactersCardsRefs.current.forEach(characterCard => {
            characterCard.classList.remove('char__item_selected');
        });
        charactersCardsRefs.current[characterCardIndex].classList.add('char__item_selected');
    }

    const renderCharacters = (arr) => {
        const characters =  arr.map((char, charIndex) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={char.id}
                    ref={elem => charactersCardsRefs.current[charIndex] = elem}
                    onClick={() => {
                        props.onCharacterSelected(char.id);
                        changeActiveCharacterCard(charIndex);
                    }}>
                        <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                        <div className="char__name">{char.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {characters}
            </ul>
        )
    }


    const characters = renderCharacters(charactersList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? characters : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
                className="button button__main button__long"
                disabled={newCharactersLoading}
                style={{'display': charactersEnded ? 'none' : 'block'}}
                onClick={() => onCharactersRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
};

export default CharList;