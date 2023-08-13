import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charactersList: [],
        loading: true,
        error: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charactersList) => {
        this.setState({
            charactersList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderCharacters(arr) {
        const characters =  arr.map((char) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={char.id}
                    onClick={() => this.props.onCharacterSelected(char.id)}>
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

        const {charactersList, loading, error} = this.state;
        
        const characters = this.renderCharacters(charactersList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? characters : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;