import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import './IpaPage.css'


export default function IpaPage() {
    const [userId, setUserId] = useState(/*TODO user.id*/);
    const [ipaName, setIpaName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [brewery, setBrewery] = useState('');
    const [breweryLink, setBreweryLink] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState(5);

    const ipaId = useParams().id;

    useEffect(() => {
        (async function() {
            const res = await csrfFetch(`/api/ipas/${ipaId}`);

            if(res.ok) {
                const ipa = await res.json();

                setUserId(ipa.userId);
                setIpaName(ipa.ipaName);
                setImageUrl(ipa.imageUrl);
                setDescription(ipa.description);
                setBrewery(ipa.brewery);
                setBreweryLink(ipa.breweryLink);
                setCountry(ipa.country);
                setRating(ipa.rating);
            }
        })();
    }, [ipaId]);

    return (
        <div className='ipa-list__container'>
            <h1>{ipaName}</h1>
        </div>
    );
}
