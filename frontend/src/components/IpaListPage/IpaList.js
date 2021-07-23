import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createIpa, destroyIpa, editIpa, getIpas } from '../../store/ipas';
import './IpaList.css';


export default function IpaList() {
    const history = useHistory();
    const [ipaList, setIpaList] = useState([]);
    const dispatch = useDispatch();
    const ipas = useSelector((state) => {
        return state.ipas.list.map(ipaId => state.ipas[ipaId]);
    });

    useEffect(() => {
        dispatch(getIpas())
        // TODO check if needed?
    }, [dispatch])

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


    return (
        <div className='ipa-list__container'>
            <div className='ipa-list__buttons__container'>
                <NavLink className='ipa-list__back' to='/profile'>
                    <i className="fas fa-arrow-circle-left"/>
                </NavLink>
                <NavLink className='ipa-list__add-ipa' to='/new-ipa'>
                    <i className="fas fa-plus"/>
                </NavLink>
            </div>
            <div>
                {/* <button  onClick={handlePost}>POST</button> */}
                {/* <button onClick={handlePut}>PUT</button> */}
                {/* <button onClick={handleDestroy}>DESTROY</button> */}
            </div>
            {ipas && ipas.map(ipa => (
                // TODO add description to the right of the div
                <div className='ipa-list__ipa-link__container'>
                    <div className='ipa-list__left'>
                        <div className='ipa-list__ipa-link__image__container'>
                            <NavLink to={`/ipas/${ipa.id}`} key={ipa.id} className='ipa-list__ipa-link__image'>
                                <img className='ipaLabel' src={ipa.imageUrl} alt={ipa.name}/>
                            </NavLink>
                        </div>
                        <div className='ipa-list__ipa-info'>
                            <div className='ipa-list__ipa-info__container'>
                                <h2>
                                    <NavLink to={`/ipas/${ipa.id}`} key={ipa.id} className='ipa-list__ipa-link__name'>
                                        {ipa.name}
                                    </NavLink>
                                </h2>
                                <h3>
                                    <NavLink to={`${ipa.breweryLink}`} key={ipa.id} className='ipa-list__ipa-link__brewery'>
                                        {ipa.brewery}
                                    </NavLink>
                                </h3>
                                <h4>{ipa.country} * ABV {ipa.ABV}% * Rating: {ipa.rating} Hops</h4>
                                {/* <p>{ipa.description}</p> */}
                            </div>
                        </div>
                    </div>
                    <div className='ipa-list__crud-buttons'>
                        <button className='ipa-list__edit-button'>
                            <NavLink className='ipa-list__edit-button' to={`/edit-ipa/${ipa.id}`}>
                                EDIT
                            </NavLink>
                        </button>
                        <button onClick={() => dispatch(destroyIpa(ipa.id))} className='ipa-list__delete-button'>DELETE</button>
                        <button className='crack-open__button'>
                            <NavLink class='crack-open__button' to={`/crack-open/${ipa.id}`}>
                                Crack Open
                            </NavLink>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
