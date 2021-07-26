import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { csrfFetch } from '../../store/csrf';
import './IpaPage.css'


export default function IpaPage() {
    // const {id} = useParams();
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [brewery, setBrewery] = useState('');
    const [breweryLink, setBreweryLink] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState(0);
    const [ABV, setABV] = useState(0);
    const [cos, setCos] = useState([]);
    const [user, setUser] = useState('');
    const currentUser = useSelector(state => state.session?.user);
    // console.log('currentUser', currentUser);
    const ipaId = useParams().id;

    useEffect(() => {
        (async function() {
            const res = await csrfFetch(`/api/ipas/${ipaId}`);
            const revs = await csrfFetch(`/api/ipas/${ipaId}/reviews`)
            if (res.ok && revs.ok) {
                const ipa = await res.json();
                const comments = await revs.json();
                setName(ipa.name);
                setImageUrl(ipa.imageUrl);
                setBrewery(ipa.brewery);
                setBreweryLink(ipa.breweryLink);
                setDescription(ipa.description);
                setCountry(ipa.country);
                setRating(ipa.rating);
                setABV(ipa.ABV);
                setCos(comments);
                setUser(currentUser);
            }
        })();
    }, [ipaId, currentUser]);
    // console.log(cos[0].userId);

    return (
        <div className='ipa-page__container'>
            <div className='ipa-list__buttons__container'>
                <NavLink className='ipa-list__back' to='/ipas'>
                    <i className="fas fa-arrow-circle-left"/>
                </NavLink>
            </div>
            <div className='ipa-content__container'>
                <div className='ipa__container'>
                    <div className='ipa-info__container'>
                        <h1 className='ipa-page__text'>{name} from<a className='ipa-page__text' href={breweryLink}>{brewery}</a></h1>
                        <p className='ipa-page__text'>{description}</p>
                        {/* TODO add working navigation to crackopen page */}
                        {/* <div className='review-link__container'>
                            <NavLink className='crack-open__button' to={`/crack-open/${id}`}>
                                Crack Open
                            </NavLink>
                        </div> */}
                    </div>
                    <div className='image-info__container'>
                        <div className='image__container'>
                            <img className='image__container' alt={name} src={imageUrl}/>
                        </div>
                        <div className='image-text__conatiner'>
                            <div className='ipa-stats_container'>
                                <p  className='ipa-page__text'>Rating: {rating} / 10 * ABV {ABV}%</p>
                            </div>
                            <div className='ipa-country__container'>
                                <h3 className='ipa-page__text'>{country}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* TODO map over all reviews pertaining to this beer */}
                {cos.map(review => {
                   return (
                       <div className='ipa-reviews__container' key={review.id}>
                           {/* TODO add {review.User.username} to below h1 */}
                            <h1> *  Someone said, {review.comment} About {name}  * </h1>
                        </div>
                   )
                })}
            </div>
        </div>


    )
}
