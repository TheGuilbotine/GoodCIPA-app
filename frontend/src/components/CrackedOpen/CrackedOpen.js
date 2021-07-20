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

            console.log('REVIEWS===>', reviews);
        })();
    }, []);

    return (
        <div className='review-list__container'>
            {/* <div className='review-list__buttons__container'>
                <NavLink to='/profile'>
                    <button className='review-list__buttons__back'>
                        Back
                    </button>
                </NavLink>
                <button className='review-list__add-review'>+</button>
            </div>
            {reviews.map(review => (
                <div className='review-list__review-link__container'>
                    <div className='review-list__review-link__image__container'>
                        <NavLink to={`/reviews/${review.id}`} key={review.id} className='review-list__review-link__image'>
                            <img className='reviewLabel' src={review.User.imageUrl} alt={review.name}/>
                        </NavLink>
                    </div>
                    <div className='review-list__review-info'>
                        <div className='review-list__review-info__container'>
                            <h2>
                                <NavLink to={`/reviews/${review.id}`} key={review.id} className='review-list__review-link__name'>
                                    {review.name}
                                </NavLink>
                            </h2>
                            <h3>
                                <NavLink to={`${review.breweryLink}`} key={review.id} className='review-list__review-link__brewery'>
                                    {review.brewery}
                                </NavLink>
                            </h3>
                            <h4>{review.country} * ABV{review.ABV}% * Rating: {review.rating} Hops</h4>
                        </div>
                    </div>
                </div>
            ))} */}
        </div>
    )
}
