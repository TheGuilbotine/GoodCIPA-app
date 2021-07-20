// import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import CreateIpaForm from '../CreateIpaForm';
import './ProfilePage.css'


function ProfilePage() {
    // const history = useHistory();

    return (
        <div className='profile-page__container'>
            <div className='profile-buttons__container'>
                <NavLink to='/cracked-open'>
                    <button>
                        Cracked Open
                    </button>
                </NavLink>
                <NavLink to='/ipas'>
                    <button>
                        IPAs
                    </button>
                </NavLink>
            </div>
            <div className='profile-content__container'>

            </div>
        </div>
    )
}

export default ProfilePage;
