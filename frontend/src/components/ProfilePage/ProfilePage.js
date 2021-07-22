// import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import AddIpa from '../AddIpa';
import './ProfilePage.css';

function ProfilePage() {
    // const history = useHistory();
    const [user, setUser] = useState('');

    useEffect(() => {
        (async function() {
            const res = await csrfFetch('/api/users/:id');

            if(res.ok) {
                const newUser = await res.json();
                setUser(newUser);
            }
        })();
    }, []);

    return (
        <div className='profile-page__container'>
            <h1 className='profile-page__text'>What'll it be {user.username}</h1>
            <div className='profile-buttons__container'>
                <div className='fridge'>
                    <NavLink className='profile-page__crackedopen' to='/cracked-open'>
                        Cracked Open
                    </NavLink>
                </div>
                <div className='cellar'>
                    <NavLink className='profile-page__ipas' to='/ipas'>
                        Beer Cave
                    </NavLink>
                </div>
            </div>
            <div className='profile-content__container'>

            </div>
        </div>
    )
}

export default ProfilePage;
