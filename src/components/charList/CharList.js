import {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charactersList: [],
        loading: true,
        error: false,
        offset: 210,
        newCharactersLoading: false,
        charactersEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onCharactersRequest();
    }

    onCharactersRequest = (offset) => {
        this.onCharListLoading();

        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newCharactersLoading: true
        });
    }

    onCharListLoaded = (newCharactersList) => {
        let ended = false;
        if (newCharactersList.length < 9) {
            ended = true;
        }

        this.setState(({charactersList, offset}) => ({
            charactersList: [...charactersList, ...newCharactersList],
            loading: false,
            newCharactersLoading: false,
            offset: offset + 9,
            charactersEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    charactersCardsRefs = [];

    addCharacterCardRef = (characterCardRef) => {
        this.charactersCardsRefs.push(characterCardRef);
    }

    changeActiveCharacterCard = (characterCardIndex) => {
        this.charactersCardsRefs.forEach(characterCard => {
            characterCard.classList.remove('char__item_selected');
        });
        this.charactersCardsRefs[characterCardIndex].classList.add('char__item_selected');
    }

    renderCharacters(arr) {
        const characters =  arr.map((char, charIndex) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={char.id}
                    ref={this.addCharacterCardRef}
                    onClick={() => {
                        this.props.onCharacterSelected(char.id);
                        this.changeActiveCharacterCard(charIndex);
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

    render() {

        const {charactersList, loading, error, newCharactersLoading, offset, charactersEnded} = this.state;
        
        const characters = this.renderCharacters(charactersList);

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
                    onClick={() => this.onCharactersRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
};

export default CharList;