import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import '../styles/game.css'
import useKeyPress from '../hooks/useKeyPress'

const Game = ({ data, games, currFrancIndex, setCurrFrancIndex, imageSet, currTitle, titleImg }) => {
    console.log('currFranc', data)

    const leftPress = useKeyPress("ArrowLeft")
    const rightPress = useKeyPress("ArrowRight")
    const [cursor, setCursor] = useState(0)

    useEffect(() => {
        if (data.length && rightPress) {
            setCursor(prevState => prevState < data.length - 1 ? prevState + 1 : prevState)
        }
        if (cursor === data.length - 1 && rightPress && currFrancIndex < games.length - 1) {
            setCurrFrancIndex(prev => prev + 1)
            setCursor(0)
        }
        if (cursor === data.length - 1 && rightPress && currFrancIndex === games.length - 1) {
            setCurrFrancIndex(0)
            setCursor(0)
        }
    }, [rightPress])

    useEffect(() => {
        if (data.length && leftPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState))
        }
        if (cursor === 0 && leftPress && currFrancIndex <= games.length - 1) {
            setCurrFrancIndex(prev => prev - 1)
            setCursor(0)
        }
        if (cursor === 0 && leftPress && currFrancIndex === 0) {
            setCurrFrancIndex(games.length - 1)
            setCursor(0)
        }
    }, [leftPress])


    useEffect(() => {
        imageSet(data[0].background_image, data[0].title_icon, data[0].title)
    }, [data])

    return (
        <>
            <Row className='m-0 d-flex flex-column'>
                <Col className='d-flex flex-row justify-content-start align-items-start'>
                    {
                        data && data.map((game, i) => {
                            if (i === cursor) {
                                imageSet(game.background_image, game.title_icon, game.title)
                            }
                            return (
                                <div
                                    className={i === cursor ? 'm-1 active logoDiv' : 'm-1 logoDiv'}
                                    onClick={() => {
                                        imageSet(game.background_image, game.title_icon, game.title)
                                        setCursor(i)
                                    }}
                                >
                                    <img
                                        className={i === cursor ? 'logoImgActive' : 'logoImg'}
                                        src={game.cover_image}
                                        alt='icon'
                                    />
                                </div>
                            )
                        })
                    }
                </Col>
                <Col>
                    <p className='text-light fw-normal fs-5'>{currTitle}</p>
                </Col>
                <Col className='p-5 d-flex flex-column'>
                    <img src={titleImg} alt='title' height={200} width={200} />
                    <Button
                        className='my-3 py-2 buy-button'
                        style={{
                            width: 200,
                            borderRadius: 1,
                            backgroundColor: '#8000ff',
                        }}
                    >Buy now</Button>
                </Col>
            </Row>
        </>
    )
}

export default Game