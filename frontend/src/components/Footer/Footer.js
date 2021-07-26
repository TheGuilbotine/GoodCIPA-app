import './Footer.css'

export default function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__designed-by'>Designed By:</p>
            <div className='footer__name-link'>
                <h3 className='footer__name'>Pierre Guilbault</h3>
                <div className='footer__icons'>
                    <a className='footer__link' href='https://github.com/TheGuilbotine/GoodCIPA-app'>
                        <i class="fab fa-github-square"></i>
                    </a>
                    <a className='footer__link' href='https://www.linkedin.com/in/pierre-guilbault-30020549/'>
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
