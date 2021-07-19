import './HomePage.css'

function HomePage() {
    return (
        <div className='splash-page__container'>
            <h1 className='splash-page__text'>Welcome to GoodCIPA!</h1>
            <p className='splash-page__text'>Drink ipa-lly!</p>
            <h2 className='splash-page__text'>Some people like beer, others love Indian Pale Ale.</h2>
            <div className='good-cipa'>
                <h3 className='splash-page__text'>How to be a Good CIPA.</h3>
                <p className='splash-page__text'>
                    Add your favorite/next on your to drink list beers to your profile.
                    Crack-open and review IPAs you are out and about enjoying.
                    Search IPAs by, name, country, type, or brewery. Get out there and start being a
                    Good Cold Indian Pale Ale sipper.
                </p>
            </div>

            <input type="text" placeholder="Search.."></input>
            <h3 className='splash-page__text'>About IPA</h3>
            <p className='splash-page__text'>

            </p>
        </div>
    )
}

export default HomePage;
