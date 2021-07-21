import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createIpa } from '../../store/ipas';
import * as ipaActions from '../../store/ipas';
import './AddIpa.css'

const AddIpa = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userId, setUserId] = useState(/*TODO user.id*/);
    const [ipaName, setIpaName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [brewery, setBrewery] = useState('');
    const [breweryLink, setBreweryLink] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState(5);
    const [ABV, setABV] = useState(5.5);
    const [errors, setErrors] = useState([]);

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
          ipaName,
          imageUrl,
          description,
          brewery,
          breweryLink,
          country,
          rating,
          ABV,
        };
        let createdIpa = await dispatch(createIpa(payload));
        return dispatch(ipaActions.createIpa({ createdIpa })).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
              if (createdIpa) {
                history.push(`/ipas`);
                }
            })
    };


      const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/ipas')
      };

    return (
        <div className='add-ipa__form__container'>
            <div className='add-ipa__buttons__container'>
                <NavLink to='/profile'>
                    <button className='add-ipa__buttons__back'>
                        Back
                    </button>
                </NavLink>
            </div>
            <ul className='errors__container'>
                {errors.map((error, idx) => (
                    <li key={idx} className='errors'>{error}</li>
                ))}
            </ul>
            <section className='new-form-holder centered middled'>
                <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Beer Name'
                    required
                    value={ipaName}
                    onChange={updateIpaName} />
                <input
                    type='text'
                    placeholder='Image URL'
                    required
                    value={imageUrl}
                    onChange={updateImageUrl} />
                <input
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={updateDescription} />
                <input
                    type='text'
                    placeholder='Brewery'
                    value={brewery}
                    onChange={updateBrewery} />
                <input
                    type='text'
                    placeholder='Brewery URL Link'
                    value={breweryLink}
                    onChange={updateBreweryLink} />
                <input
                    type='text'
                    placeholder='Country'
                    value={country}
                    onChange={updateCountry} />
                <label for='rating'>Rating</label>
                <input
                    name='rating'
                    type='number'
                    step='0.5'
                    min='1'
                    max='10'
                    value={rating}
                    onChange={updateRating} />
                <label for='abv'>ABV</label>
                <input
                    name='abv'
                    type='number'
                    step='0.1'
                    min='0'
                    max='20'
                    placeholder='ABV'
                    value={ABV}
                    onChange={updateABV} />
                <button type='submit'>Create new IPA</button>
                <button type='button' onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        </div>
    )
}

export default AddIpa;
