import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as ipaActions from '../../store/ipas';
import './AddIpa.css'

const AddIpa = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ipaName, setIpaName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [brewery, setBrewery] = useState('');
    const [breweryLink, setBreweryLink] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState(5);
    const [ABV, setABV] = useState(5.5);
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id);

    // const updateUserId = (e) => setUserId(e.target.value);
    const updateIpaName = (e) => setIpaName(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateBrewery = (e) => setBrewery(e.target.value);
    const updateBreweryLink = (e) => setBreweryLink(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateRating = (e) => setRating(e.target.value);
    const updateABV = (e) => setABV(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            userId,
            name: ipaName,
            imageUrl,
            description,
            brewery,
            breweryLink,
            country,
            rating,
            ABV,
        };
        let createdIpa = await dispatch(ipaActions.createIpa(payload));
        if (createdIpa) {
            history.push(`/ipas`);
            setErrors(createdIpa.errors)
        }
        console.log('Errors?????', createdIpa.errors)
        // return dispatch(ipaActions.createIpa({ createdIpa })).catch(
        //     async (res) => {
        //       const data = await res.json();
        //       if (data && data.errors) setErrors(data.errors);
        //     })
    };




    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/ipas')
    };

    return (
        <div className='add-ipa__form-container'>
            <div className='add-ipa__buttons__container'>
                <NavLink className='add-ipa__buttons__back' to='/ipas'>
                    <i className="fas fa-arrow-circle-left"/>
                </NavLink>
            </div>
            <ul className='errors__container'>
                {errors.map((error, idx) => (
                    <li key={idx} className='errors'>{error}</li>
                ))}
            </ul>
            <section className='add-ipa__form'>
                <h1 className='add-ipa__text'>Add to your Beer Cave</h1>
                <form onSubmit={handleSubmit}>
                    <div className='add_ipa__element-container'>
                        <i className='fas fa-beer'>
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    placeholder='Beer Name'
                                    type='text'
                                    value={ipaName}
                                    onChange={updateIpaName}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-camera-retro">
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    placeholder='Image URL'
                                    type='text'
                                    value={imageUrl}
                                    onChange={updateImageUrl}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-pencil-alt">
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    placeholder='Description'
                                    type='text'
                                    value={description}
                                    onChange={updateDescription}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-industry">
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    placeholder='Brewery'
                                    type='text'
                                    value={brewery}
                                    onChange={updateBrewery}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-globe">
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    placeholder='Brewery URL Link'
                                    type='text'
                                    value={breweryLink}
                                    onChange={updateBreweryLink}
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-globe-africa">
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    placeholder='Country'
                                    type='text'
                                    value={country}
                                    onChange={updateCountry}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-star">
                        <label for='rating'>Rating</label>
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    name='rating'
                                    type='number'
                                    step='0.5'
                                    min='1'
                                    max='10'
                                    value={rating}
                                    onChange={updateRating}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                    <div className='add_ipa__element-container'>
                        <i className="fas fa-percent">
                        <label for='abv'>ABV</label>
                            <div className='add-ipa__input-container'>
                                <input
                                    className='add-ipa__input'
                                    name='abv'
                                    type='number'
                                    step='0.1'
                                    min='0'
                                    max='20'
                                    placeholder='ABV'
                                    value={ABV}
                                    onChange={updateABV}
                                    required
                                />
                            </div>
                        </i>
                    </div>
                <button className='create-button' type='submit'>Stock new IPA</button>
                <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        </div>
    )
}

export default AddIpa;
