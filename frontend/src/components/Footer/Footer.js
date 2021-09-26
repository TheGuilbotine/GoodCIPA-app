import './Footer.css'

export default function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__designed-by'>Designed By:</p>
            <div className='footer__name-link'>
                <h3 className='footer__name'><a className='footer__link' target="_blank" rel="noreferrer" href='https://theguilbotine.github.io/Portfolio/'>Pierre Guilbault</a></h3>
                <div className='footer__icons'>
                    <a className='footer__link' target="_blank" rel="noreferrer" href='https://github.com/TheGuilbotine/GoodCIPA-app'>
                        <i class="fab fa-github-square"></i>
                    </a>
                    <a className='footer__link' target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/pierre-guilbault-30020549/'>
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a className='footer__link' target="_blank" rel="noreferrer" href='https://angel.co/u/pierre-guilbault-1'>
                        <i class="fab fa-angellist"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
