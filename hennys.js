const sessionUser = useSelector(state => state.session.user);

  const todos = useSelector(state => {
    return Object.values(state.todo).filter(td => td.userId === sessionUser?.id)
    .reverse();
  });



      // useEffect(() => {
    //     (async function() {
    //         const res = await csrfFetch('/api/ipas');

    //         if(res.ok) {
    //             const newIpas = await res.json();
    //             setIpas(newIpas);
    //         }
    //     })();
    // }, []);
    const postData = {
      "userId": 1,
      "name": "Nicoliciousness",
      "imageUrl": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.t1qZfee0hU7lBdBkpM7-VwHaHa%26pid%3DApi%26h%3D160&f=1",
      "brewery": "Open Gate Brewery",
      "breweryLink": "https://www.guinnessopengate.com/the-brewery",
      "description": "Surprising tatse",
      "country": "United States of America",
      "rating": "6.0",
      "ABV": "5.0",
      "createdAt": "2021-07-21T13:35:37.483Z",
      "updatedAt": "2021-07-21T13:35:37.483Z",
      }
  const putData = {
      'id': 35,
      "userId": 1,
      "name": "Jesus Juice",
      "imageUrl": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.t1qZfee0hU7lBdBkpM7-VwHaHa%26pid%3DApi%26h%3D160&f=1",
      "brewery": "Open Gate Brewery",
      "breweryLink": "https://www.guinnessopengate.com/the-brewery",
      "description": "Surprising tatse",
      "country": "United States of America",
      "rating": "6.0",
      "ABV": "5.0",
      "createdAt": "2021-07-21T13:35:37.483Z",
      "updatedAt": "2021-07-21T13:35:37.483Z",
      }

  const handlePost = () => {
      dispatch(createIpa(postData))
  }

  const handlePut = (putData) => {
      dispatch(editIpa(putData))
  }

  const handleDestroy = (id) => {
      dispatch(destroyIpa(id))
  }






  <div>
  {/* <button  onClick={handlePost}>POST</button> */}
  {/* <button onClick={handlePut}>PUT</button> */}
  {/* <button onClick={handleDestroy}>DESTROY</button> */}
</div>
















// import { useState, useEffect } from 'react';
// import { useParams, NavLink } from 'react-router-dom';
// import { csrfFetch } from '../../store/csrf';

    // const [userId, setUserId] = useState(/*TODO user.id*/);
    // const [ipaName, setIpaName] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [description, setDescription] = useState('');
    // const [brewery, setBrewery] = useState('');
    // const [breweryLink, setBreweryLink] = useState('');
    // const [country, setCountry] = useState('');
    // const [rating, setRating] = useState(5);

    // const ipaId = useParams().id;

    // useEffect(() => {
    //     (async function() {
    //         const res = await csrfFetch(`/api/ipas/${ipaId}`);

    //         if(res.ok) {
    //             const ipa = await res.json();

    //             setUserId(ipa.userId);
    //             setIpaName(ipa.ipaName);
    //             setImageUrl(ipa.imageUrl);
    //             setDescription(ipa.description);
    //             setBrewery(ipa.brewery);
    //             setBreweryLink(ipa.breweryLink);
    //             setCountry(ipa.country);
    //             setRating(ipa.rating);
    //         }
    //     })();
    // }, [ipaId]);
