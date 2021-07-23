import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { destroyCO, getCOs } from '../../store/reviews';
import './CrackedOpen.css';

export default function CrackedOpen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector(state => state.cos.list.map(id => state.cos[id]));
    const sessionUser = useSelector(state => state.session.user);


    useEffect(async () => {
        dispatch(getCOs());
    }, [dispatch]);

    return (
        <div className='review-list__container'>
            <div className='review-list__buttons__container'>
                <NavLink className='review-list__back' to='/profile'>
                    <i className="fas fa-arrow-circle-left"/>
                </NavLink>
                {/* <NavLink className='review-list__add' to='/crack-open'>
                    +
                </NavLink> */}
            </div>
            {reviews && reviews.map(review => (
                <div key={review.id}className='review-list__review-link__container'>
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
                    { function ButtonsRender() {
                        // const sessionUser = useSelector(state => state.session.user);
                        if (sessionUser.id === review.userId) {
                            return (
                                <div className='review-list__crud-buttons'>
                                <button className='review-list__edit-button'>
                                    <NavLink className='review-list__edit-button' to={`/edit-cracked-open/${review.id}`}>
                                        EDIT
                                    </NavLink>
                                </button>
                                <button onClick={async() => {
                                        dispatch(destroyCO(review.id))
                                        history.push('/cracked-open')
                                        return;
                                }} className='review-list__delete-button'>DELETE</button>
                            </div>
                            )
                        }
                    }()}
                </div>
            ))}
        </div>
    )
}
