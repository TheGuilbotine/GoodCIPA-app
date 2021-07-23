import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { csrfFetch } from '../../store/csrf';
import './IpaPage.css'


export default function IpaPage() {
    const {id} = useParams();
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
    console.log('currentUser', currentUser)
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
    }, [ipaId]);


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
                        <h1>{name} from <a href={breweryLink}>{brewery}</a></h1>
                        <p>{description}</p>
                        <NavLink className='ipa__add-review' to={`/crack-open/${id}`}>
                            {/* <i className="fas fa-plus"/> */}
                            Crack Open
                        </NavLink>
                    </div>
                    <div className='image-info__container'>
                        <div className='image__container'>
                            <img className='image__container' src={imageUrl}/>
                        </div>
                        <div className='image-text__conatiner'>
                            <div className='ipa-stats_container'>
                                <p className='ipa__text'>{rating} / 10 * ABV {ABV}%</p>
                            </div>
                            <div className='ipa-country__container'>
                                <p className='ipa__text'>{country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ipa-reviews__container'>
                {/* TODO map over all reviews pertaining to this beer */}
                {cos.map(review => {
                   return (
                       <div key={review.id}>
                            <h1>{user.username} said, {review.comment}. About {name}</h1>
                        </div>
                   )
                })}
            </div>
        </div>


    )
}
