// import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import AddIpa from '../AddIpa';
import './ProfilePage.css'


function ProfilePage() {
    // const history = useHistory();

    return (
        <div className='profile-page__container'>
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
