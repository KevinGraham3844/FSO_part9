import { useState, useEffect } from 'react';

import axios from 'axios';

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}


type NewDiary = Omit<Diary, 'id'>

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getAllDiaries = async () => {
    const response = await axios.get('http://localhost:3000/api/diaries')
    console.log(response)
    setDiaries(response.data as Diary[]);
  }
  
  const createDiary = async (object: NewDiary) => {
    try {
      const response = await axios.post('http://localhost:3000/api/diaries', object)
      setDiaries(diaries.concat(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error!.response!.data!)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      } else {
        console.error(error)
      }
    } 
  
  }

  useEffect( () => {
    getAllDiaries()
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    createDiary(diaryToAdd);
    
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div>
      <h1>Add New Entry</h1>
      <div style={{ color: 'red' }}>
        {errorMessage}
      </div>
      <form onSubmit={diaryCreation}>
        <div>
          date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <b>visibility</b>{' '}
          great <input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("great")} />
          good <input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("good")} />
          ok <input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("ok")} />
          poor <input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("poor")} />
        </div>
        <div>
          <b>weather</b>{'  '}
          sunny<input type="radio" name="weather" value={weather} onChange={() => setWeather("sunny")} />
          rainy<input type="radio" name="weather" value={weather} onChange={() => setWeather("rainy")} />
          cloudy<input type="radio" name="weather" value={weather} onChange={() => setWeather("cloudy")} />
          stormy<input type="radio" name="weather" value={weather} onChange={() => setWeather("stormy")} />
          windy<input type="radio" name="weather" value={weather} onChange={() => setWeather("windy")} />
        </div>
        <div>
          <b>comment </b>
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary Entries</h1>
      <ul>
        {diaries.map(diary => 
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </div>
        )}
      </ul>
    </div>
  )
}

export default App
