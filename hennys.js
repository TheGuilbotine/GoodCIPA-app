import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import {editPlant} from '../../store/plants.js';
import {getPlants, editPlant, removePlant} from '../../store/plants.js';
import {getNotes} from '../../store/notes.js';
import Notes from './../Notes';
const Plant = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => {
    return state.session.user
  });
  const plants = useSelector(state => {
    return state.plant;
  });
  const notes = useSelector(state => {
    return Object.values(state.note);
  });
// console.log(notes);
  const plant = plants[id];
// console.log(plant);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [binomialName, setBinomialName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [description, setDescription] = useState('');
  const [sunRequirements, setSunRequirements] = useState('');
  const [userId, setUserId] = useState(0);
  const [errors, setErrors] = useState([])
  useEffect(() => {
    dispatch(getNotes());
    dispatch(getPlants());
    if(plant){
      setName(plant.name);
      setBinomialName(plant.binomialName);
      setImgUrl(plant.imgUrl);
      setDescription(plant.description);
      setSunRequirements(plant.sunRequirements);
      setUserId(plant.userId);
    }
  }, []);
  // console.log(sessionUser, 'sessionUser');
  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(editPlant({ id, name, binomialName, imgUrl, description, sunRequirements, userId}))
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // });
  //console.log(plant)
      setShowForm(false);
      // history.push(`/plants/${plant.id}`);
      return;
  }
  const handleDelete = async(e) => {
    // e.preventDefault();
    await dispatch(removePlant(id))
    history.push('/plants');
  }
  let plantDom;
  if(plant && !showForm ) {
    plantDom = (
    <>
      <div className='plantName'>
        <h2>{plant.name}</h2>
      </div>
      <div className='plantBinomialName'>
        <p>{plant.binomialName}</p>
        {/* <p>{plant?.binomialName}</p>  <-- optionalchaining */}
      </div>
      <div className='plantImg'>
        <img src={plant.imgUrl} alt={plant.binomialName} />
      </div>
      <div className='plantSunReq'>
        <p>{plant.sunRequirements}</p>
      </div>
      <div className='plantDescription'>
        {/* shorten descrip CHANGE BACK */}
        <p>{plant.description.slice(0, 200)}</p>
      </div>
      {sessionUser.id === plant.userId &&<div className='plantShowFormBttn'>
        <button onClick={() => setShowForm(true)}>Edit / Delete</button>
      </div>}
      <div className='plantUser'>
        <p>{plant.userId}</p>
      </div>
      <div className='plantCreatedAt'>
        <p>{plant.createdAt}</p>
      </div>
    </>
    )
} else if(plant && showForm ) {
  plantDom = (
    <div className="editPlantForm form">
      <div className='editPlantTitle'><h2>Edit Your Plant:</h2></div>
      <form onSubmit={handleSubmit}>
        <button className='editPlantButton' type='submit'>Edit Plant</button>
        <button
          className='editPlantButton'
          type='click'
          onClick={handleDelete}
        >DELETE Plant</button>
        <div className='errorsContainer'>
          <ul>
            {/* map over errors */}
          </ul>
        </div>
        <label>
          Name Of plant:
          <input type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required
          />
        </label>
        <label>
          Binomial Name:
          <input type="text"
                 value={binomialName}
                 onChange={(e) => setBinomialName(e.target.value)}
                 required
          />
        </label>
        <label>
          Image Link:
          <input type="text"
                 value={imgUrl}
                 onChange={(e) => setImgUrl(e.target.value)}
                 required
          />
        </label>
        <label>
          Description:
          <input type="text"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 required
          />
        </label>
        <label>
          Sun Requirements:
          <input type="text"
                 value={sunRequirements}
                 onChange={(e) => setSunRequirements(e.target.value)}
                 required
          />
        </label>
        <label>
          UserId:
          <input type="number"
                 value={userId}
                 onChange={(e) => setUserId(e.target.value)}
                 required
          />
        </label>
      </form>
    </div>
    );
} else {
  plantDom = null;
}
  return (
    <div className='plantContainer'>
      <Notes notes={notes}/>
      {plantDom}
    </div>
  );
}
export default Plant;
