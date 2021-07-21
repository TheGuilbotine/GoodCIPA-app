import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import './CrackedOpen.css';

export default function CrackedOpen() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async function() {
            const res = await csrfFetch('/api/cracked-open');

            if(res.ok) {
                const newReviews = await res.json();
                setReviews(newReviews);
            }
        })();
    }, []);
    console.log('REVIEWS===>', reviews);

    return (
        <div className='review-list__container'>
            <div className='review-list__buttons__container'>
                <NavLink className='review-list__back' to='/profile'>
                    Back
                </NavLink>
                <NavLink className='review-list__add' to='/crack-open'>
                    +
                </NavLink>
            </div>
            {reviews.map(review => (
                <div className='review-list__review-link__container'>
                    <div className='review-list__left'>
                        <div className='review-list__review-link__image__container'>
                            <NavLink to={`/reviews/${review.id}`} key={review.id} className='review-list__review-link__image'>
                                <img className='reviewLabel' src={review.IPA.imageUrl} alt={review.name}/>
                            </NavLink>
                        </div>
                        <div className='review-list__review-info'>
                            <div className='review-list__review-info__container'>
                                <p>
                                    <b>{review.User.username}</b> has cracked open a <b>{review.IPA.name}</b> from <b>{review.IPA.brewery}</b>.
                                </p>
                                <p>
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='review-list__crud-buttons'>
                        <button className='review-list__edit-button'>EDIT</button>
                        <button className='review-list__delete-button'>DELETE</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
