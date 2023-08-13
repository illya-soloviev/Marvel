import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        characterInfo: {},
        loading: true,
        error: false
    }

    componentDidMount = () => {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter(), 3000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timerId);
    }

    onCharacterLoading = () => {
        this.setState({
            loading: true
        });
    }

    marvelService = new MarvelService();
    
    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.onCharacterLoading();

        this.marvelService
            .getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    onCharacterLoaded = (characterInfo) => {
        this.setState({
            characterInfo: characterInfo,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const {characterInfo, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View characterInfo={characterInfo}/> : null;

        return (
            <div className="randomchar">
                {spinner}
                {errorMessage}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateCharacter} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    
}

const View = ({characterInfo}) => {
    const {name, description, thumbnail, homepage, wiki} = characterInfo;
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
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;