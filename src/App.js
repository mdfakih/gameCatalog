import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'reactstrap';
import Game from './components/Game';

function App() {

  const [games, setGames] = useState([])
  const [currFrancIndex, setCurrFrancIndex] = useState(0)
  const [currFranchise, setCurrFranchise] = useState([])
  const [bgimage, setBgImage] = useState('')
  const [currTitle, setCurrTitle] = useState('')
  const [titleImg, setTitleImg] = useState('')

  const [cursorLvl, setCursorLvl] = useState(1)

  const getData = async () => {
    try {
      let response = await axios.get('https://run.mocky.io/v3/31709b10-7d7a-448f-8d52-103cfaca1875')
      if (response.data) {
        setGames(response.data.games)
        setCurrFranchise(response.data.games[0])
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  const imageSet = (background, title, name) => {
    setBgImage(background)
    setTitleImg(title)
    setCurrTitle(name)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {console.log('cursorl', cursorLvl)}
      {
        games && games.length > 0 ? (
          <Col
            style={{
              backgroundImage: `url(${bgimage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: 'background-image 0.75s ease-in',
              height: '100vh',
              width: '100vw'
            }}
          >
            <Header
              data={games}
              currFrancIndex={currFrancIndex}
              setCurrFrancIndex={setCurrFrancIndex}
              setCurrFranchise={setCurrFranchise}
              cursorLvl={cursorLvl}
              setCursorLvl={setCursorLvl}
            />
            <Game
              data={currFranchise.titles}
              games={games}
              currFrancIndex={currFrancIndex}
              setCurrFrancIndex={setCurrFrancIndex}
              currTitle={currTitle}
              titleImg={titleImg}
              imageSet={imageSet}
              cursorLvl={cursorLvl}
              setCursorLvl={setCursorLvl}
            />
          </Col >
        ) : (
          <Row>
            <Col>
              <h1>NO GAMES AVAILABLE!</h1>
            </Col>
          </Row>
        )
      }
    </>
  );
}

export default App;
