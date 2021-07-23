import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createIpa, destroyIpa, editIpa, getIpas } from '../../store/ipas';
import './IpaList.css';


export default function IpaList() {
    // const history = useHistory();
    // const [ipaList, setIpaList] = useState([]);
    const dispatch = useDispatch();
    const ipas = useSelector((state) => {
        return state.ipas.list.map(ipaId => state.ipas[ipaId]);
    });

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getIpas())
    }, [dispatch])

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
            {ipas && ipas.map(ipa => (
                // TODO add description to the right of the div or in a enw component...?
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
                                    <a href={`${ipa.breweryLink}`} key={ipa.id} className='ipa-list__ipa-link__brewery'>
                                        {ipa.brewery}
                                    </a>
                                </h3>
                                <h4>{ipa.country} * ABV {ipa.ABV}% * Rating: {ipa.rating} Hops</h4>
                                {/* <p>{ipa.description}</p> */}
                            </div>
                        </div>
                    </div>
                    { function ButtonsRender() {
                        // const sessionUser = useSelector(state => state.session.user);
                        if (sessionUser.id === ipa.userId) {
                            return (
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
                            )
                        }
                    }()}
                </div>
            ))}
        </div>
    )
}
