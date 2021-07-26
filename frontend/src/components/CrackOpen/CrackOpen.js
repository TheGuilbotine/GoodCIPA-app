import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createCO, getCOs } from '../../store/reviews';
import './CrackOpen.css'

export default function CrackOpen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const [comment, setComment] = useState('');
    // const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id);
    const ipaId = useSelector(state => state.ipas[id].id);
    const sessionUser = useSelector(state => state.session.user);
    const beers = useSelector(state => {
        return state.ipas;
    })
    const beer = beers[id];

    // const drinkers = useSelector(state => state.users);
    // const drinker = drinkers[id];

    const updateComment = (e) => setComment(e.target.value);

    useEffect(() => {
        dispatch(getCOs())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        // const User = User.findByPk(User)

        const payload = {
            userId,
            ipaId,
            comment
        };
        let createComment = await dispatch(createCO(payload));
        if (createComment) {
            // setErrors(createComment.errors)
            history.push('/cracked-open');
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/ipas')
    };

    return (
        <div className='add-comment__form-container'>
            <div className='add-comment__buttons__container'>
                <NavLink className='add-comment__buttons__back' to='/ipas'>
                    <i className="fas fa-arrow-circle-left"/>
                </NavLink>
            </div>
            <div className='add_comment__title__container'>
                <h1 className='add-comment__text'>Crack Open and Review {beer.name} from {beer.brewery}</h1>
            </div>
            <section className='add-comment__form'>
                {/* <ul className='errors__container'>
                    {errors.map((error, idx) => (
                        <li key={idx} className='errors'>{error}</li>
                    ))}
                </ul> */}
                <form onSubmit={handleSubmit}>
                <div className='add_comment__element-container'>
                        <i className='fas fa-beer'>
                            <div className='add-comment__input-container'>
                                <textarea
                                    className='add-comment__input'
                                    // TODO Add ${beer.User.username}
                                    placeholder={`How was your ${beer.name} ${sessionUser.username}?`}
                                    type='text'
                                    value={comment}
                                    onChange={updateComment}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                <button className='create-button' type='submit'>Crack Open IPA</button>
                <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        </div>
    )
}
