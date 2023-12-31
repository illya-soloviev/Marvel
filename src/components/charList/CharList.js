import {useState, useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const setContent = (process, Component, newCharactersLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newCharactersLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process value');
    }
}

const CharList = (props) => {
    const [charactersList, setCharactersList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newCharactersLoading, setNewCharactersLoading] = useState(false);
    const [charactersEnded, setCharactersEnded] = useState(false);
    
    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onCharactersRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onCharactersRequest = (offset, initial) => {
        initial ? setNewCharactersLoading(false) : setNewCharactersLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharactersList) => {
        let ended = false;
        if (newCharactersList.length < 9) {
            ended = true;
        }

        setCharactersList(charactersList => [...charactersList, ...newCharactersList]);
        setNewCharactersLoading(false);
        setOffset(offset => offset + 9);
        setCharactersEnded(ended);
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
                <CSSTransition key={char.id} timeout={500} classNames={'char__item'}>
                    <li 
                        className="char__item"
                        ref={elem => charactersCardsRefs.current[charIndex] = elem}
                        onClick={() => {
                            props.onCharacterSelected(char.id);
                            changeActiveCharacterCard(charIndex);
                        }}>
                            <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                            <div className="char__name">{char.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {characters}
                </TransitionGroup>
            </ul>
        )
    }

    const characters = useMemo(() => {
        return setContent(process, () => renderCharacters(charactersList), newCharactersLoading);
        // eslint-disable-next-line
    }, [process]);

    return (
        <div className="char__list">
            {characters}
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