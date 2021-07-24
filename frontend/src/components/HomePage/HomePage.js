import './HomePage.css'

function HomePage() {
    return (
        <div className='splash-page__container'>
            <div className='splash-page__welcome'>
                <h1 className='splash-page__text'>Welcome to GoodCIPA!</h1>
                <p className='splash-page__text splash-page__text-paragraph'>Drink ipa-lly!</p>
                <h2 className='splash-page__text'>Some people like beer, others love Indian Pale Ale.</h2>
            </div>
            <div className='good-cipa__image__container'>
                <img className='splash-page__logo' src='https://i.imgur.com/xOksAty.png' alt='GoodCIPA Logo'/>
            </div>
            <div className='good-cipa'>
                <h3 className='splash-page__text'>How to be a Good CIPA.</h3>
                <p className='splash-page__text'>
                    Add IPAs to your Beer Cave.
                    Crack Open and Review.
                    {/* Add your favorite/next on your to drink list beers to your profile.
                    Crack-open and review IPAs you are out and about enjoying.
                    Search IPAs by, name, country, type, or brewery. Get out there and start being a
                    Good Cold Indian Pale Ale sipper. */}
                </p>
            </div>
            {/* <div className='splash-page__search-bar'>
                <input className='splash-page__search' type="text" placeholder="  Search..."></input>
            </div>
            <div className='splash-page__search-container'>
                <ul className='splash-page__search-results'>
                    SEARCHED ITEMS HERE
                </ul>
            </div> */}
            <div className='splash-page__disclaimer-container'>
                <h3 className='splash-page__text'>
                    There are some people who should not drink any alcohol, including those who are:
                </h3>
                <ul className='splash-page__disclaimer-list'></ul>
                    <li className='splash-page__text'>Younger than age 21.</li>
                    <li className='splash-page__text'>Pregnant or may be pregnant.</li>
                    <li className='splash-page__text'>Driving, planning to drive, or participating in other activities requiring skill, coordination, and alertness.</li>
                    <li className='splash-page__text'>Taking certain prescription or over-the-counter medications that can interact with alcohol.</li>
                    <li className='splash-page__text'>Suffering from certain medical conditions.</li>
                    <li className='splash-page__text'>Recovering from alcoholism or are unable to control the amount they drink.</li>
                <h4 className='splash-page__text'>By adhering to the <a className='splash-page-link' href='https://www.cdc.gov/alcohol/fact-sheets/moderate-drinking.htm'>Dietary Guidelines</a>, you can reduce the risk of harm to yourself or others.</h4>
            </div>
            <div className='good-cipa history'>
                <h3 className='splash-page__text'>About IPA</h3>
                <p className='splash-page__text'>
                'The IPA is one of, if not the most popular style in the craft beer world,
                with there now being at least one on tap in nearly every bar you visit.
                Known most for its bitter hop character, the IPA is a style with a rich history.
                In the mid 1780’s, the British Empire’s largest outpost was India.
                Keen for familiar flavors from home but faced with inauspicious brewing conditions,
                the beer from home often wasn’t any good as it was often spoiled by the time it reached the Indian shores.

                A solution was quickly crafted by a brewery near Essex, to add loads more hops and up the alcohol volume,
                to serve as a preservative.  As it became more popular, other breweries started to create their own versions,
                making this strongly flavored pale ale a fixture across the world.
                India Pale Ales all but dropped off the map when the Prohibition occurred in America,
                until a resurgence of home brewing in the 1970’s.'
                <a className='splash-page-link' href='https://www.brewdog.com/blog/a-brief-history-of-the-ipa'>-brewdog.com</a>
                </p>
            </div>

        </div>
    )
}

export default HomePage;
