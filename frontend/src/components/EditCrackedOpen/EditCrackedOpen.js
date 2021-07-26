import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { editCO } from '../../store/reviews';
import './EditCrackedOpen.css'

export default function EditCrackedOpen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const [comment, setComment] = useState('');
    // const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id);
    const ipaId = useSelector(state => state.cos[id].ipaId
        // console.log(state)
        // state.ipas[id]?.id
        // Add {} again around anything in here

        );

    const beers = useSelector(state => {
        return state.ipas;
    })
    // const beer = beers[id];
    console.log(beers)

    const updateComment = (e) => setComment(e.target.value);

    // useEffect(() => {
    //     dispatch(getCOs())
    // }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);

        const payload = {
            id,
            userId,
            ipaId,
            comment
        };
        let createComment = await dispatch(editCO(payload));
        if (createComment) {
            history.push('/cracked-open');
            // setErrors(createComment.errors);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/cracked-open')
    };

    return (
        <div className='edit-comment__form-container'>
            <div className='edit-comment__buttons__container'>
                <NavLink className='edit-comment__buttons__back' to='/cracked-open'>
                    <i className="fas fa-arrow-circle-left"/>
                </NavLink>
            </div>
            <div className='edit_comment__title__container'>
                {/* TODO add >Edit your review for {beer.name} from {beer.brewery}< to below h1 */}
                <h1 className='edit-comment__text'>Edit your review for the IPA</h1>
            </div>
            <section className='edit-comment__form'>
                {/* <ul className='errors__container'>
                    {errors.map((error, idx) => (
                        <li key={idx} className='errors'>{error}</li>
                    ))}
                </ul> */}
                {/* TODO add  {beer.name} from {beer.brewery} */}
                <form onSubmit={handleSubmit}>
                <div className='edit_comment__element-container'>
                        <i className='fas fa-beer'>
                            <div className='edit-comment__input-container'>
                                <textarea
                                    className='edit-comment__input'
                                    // TODO add   ${beer.name} ${beer.User.username}
                                    placeholder={`Change of opinion?`}
                                    type='text'
                                    value={comment}
                                    onChange={updateComment}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                <button className='create-button' type='submit'>Edit your Comment</button>
                <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        </div>
    )
}
