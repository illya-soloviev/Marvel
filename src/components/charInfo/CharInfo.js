import { Component } from 'react/cjs/react.development';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        characterInfo: null,
        loading: false,
        error: false
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.characterId !== this.props.characterId) {
            this.updateCharacter();
        }
    }

    onCharacterLoading = () => {
        this.setState({
            loading: true
        });
    }

    marvelService = new MarvelService();
    
    updateCharacter = () => {
        if (!this.props.characterId) {
            return;
        }
        const charId = this.props.characterId;

        this.onCharacterLoading();

        this.marvelService
            .getCharacter(charId)
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

        const skeleton = characterInfo || loading || error ? null : <Skeleton/>
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error || !characterInfo) ? <View characterInfo={characterInfo}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({characterInfo}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = characterInfo;
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
            <li className="char__comics-item"
                key={i}>
                {comics[i].name}
            </li>
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
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
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

export default CharInfo;