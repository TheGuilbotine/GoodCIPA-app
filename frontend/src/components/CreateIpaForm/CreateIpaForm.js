// import { useHistory } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createIpa } from '../../store/ipas';
// import './CreateIpaForm.css'

// const CreateIpaForm = ({ hideForm }) => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [userId, setUserId] = useState(/*TODO user.id*/);
//     const [ipaName, setIpaName] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [description, setDescription] = useState('');
//     const [brewery, setBrewery] = useState('');
//     const [breweryLink, setBreweryLink] = useState('');
//     const [country, setCountry] = useState('');
//     const [rating, setRating] = useState(5);

//     // const updateUserId = (e) => setUserId(e.target.value);
//     const updateIpaName = (e) => setIpaName(e.target.value);
//     const updateImageUrl = (e) => setImageUrl(e.target.value);
//     const updateDescription = (e) => setDescription(e.target.value);
//     const updateBrewery = (e) => setBrewery(e.target.value);
//     const updateBreweryLink = (e) => setBreweryLink(e.target.value);
//     const updateCountry = (e) => setCountry(e.target.value);
//     const updateRating = (e) => setRating(e.target.value);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//           userId,
//           ipaName,
//           imageUrl,
//           description,
//           brewery,
//           breweryLink,
//           country,
//           rating,
//           createdAt,
//           updatedAt
//         };

//         let createdIpa = await dispatch(createIpa(payload));
//         if (createdIpa) {
//           history.push(`/profile/${createdIpa.id}`);
//           hideForm();
//         }
//       };

//       const handleCancelClick = (e) => {
//         e.preventDefault();
//         hideForm();
//       };

//     return (
//         <section className="new-form-holder centered middled">
//             <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Beer Name"
//                 required
//                 value={ipaName}
//                 onChange={updateIpaName} />
//             <input
//                 type="text"
//                 placeholder="Image URL"
//                 required
//                 value={imageUrl}
//                 onChange={updateImageUrl} />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 required
//                 value={description}
//                 onChange={updateDescription} />
//             <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={imageUrl}
//                 onChange={updateImageUrl} />
//             <input
//                 type="text"
//                 placeholder="Brewery"
//                 value={brewery}
//                 onChange={updateBrewery} />
//             <input
//                 type="text"
//                 placeholder="Brewery URL Link"
//                 value={breweryLink}
//                 onChange={updateBreweryLink} />
//             <input
//                 type="text"
//                 placeholder="Country"
//                 value={country}
//                 onChange={updateCountry} />
//             <input
//                 type="number"
//                 placeholder="Rating"
//                 min='1'
//                 max='10'
//                 value={rating}
//                 onChange={updateRating} />
//             <button type="submit">Create new IPA</button>
//             <button type="button" onClick={handleCancelClick}>Cancel</button>
//             </form>
//         </section>
//     )
// }

// export default CreateIpaForm;
