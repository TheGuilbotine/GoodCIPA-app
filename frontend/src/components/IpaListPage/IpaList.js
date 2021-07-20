import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import './IpaList.css';


export default function IpaList() {
    const [ipas, setIpas] = useState([]);

    useEffect(() => {
        (async function() {
            const res = await csrfFetch('/api/ipas');

            if(res.ok) {
                const newIpas = await res.json();
                setIpas(newIpas);
            }
        })();
    }, []);
    console.log('IPAS ====>', ipas)
    return (
        <div className='ipa-list__container'>
            <div className='ipa-list__buttons__container'>
                <NavLink to='/profile'>
                    <button className='ipa-list__buttons__back'>
                        Back
                    </button>
                </NavLink>
                <NavLink to='/new-ipa'>
                    <button className='ipa-list__add-ipa'>
                        +
                    </button>
                </NavLink>
            </div>
            {ipas.map(ipa => (
                // TODO add description to the right of the div
                <div className='ipa-list__ipa-link__container'>
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
                    <div className='ipa-list__crud-buttons'>
                        <button className='ipa-list__edit-button'>EDIT</button>
                        <button className='ipa-list__delete-button'>DELETE</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
