import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import '../styles/game.css'
import useKeyPress from '../hooks/useKeyPress'

const Game = ({
    data,
    games,
    currFrancIndex,
    setCurrFrancIndex,
    imageSet,
    currTitle,
    titleImg,
    cursorLvl,
    setCursorLvl
}) => {
    console.log('currFranc', data)

    const leftPress = useKeyPress("ArrowLeft")
    const rightPress = useKeyPress("ArrowRight")
    const downPress = useKeyPress("ArrowDown")
    const upPress = useKeyPress("ArrowUp")
    const [cursor, setCursor] = useState(0)

    useEffect(() => {
        if (data.length && rightPress && cursorLvl === 1) {
            setCursor(prev => prev < data.length - 1 ? prev + 1 : prev)
        }
        if (cursor === data.length - 1 && rightPress && currFrancIndex < games.length - 1 && cursorLvl === 1) {
            setCurrFrancIndex(prev => prev + 1)
            setCursor(0)
        }
        if (cursor === data.length - 1 && rightPress && currFrancIndex === games.length - 1 && cursorLvl === 1) {
            setCurrFrancIndex(0)
            setCursor(0)
        }
    }, [rightPress])

    useEffect(() => {
        if (data.length && leftPress && cursorLvl === 1) {
            setCursor(prev => (prev > 0 ? prev - 1 : prev))
        }
        if (cursor === 0 && leftPress && currFrancIndex <= games.length - 1 && cursorLvl === 1) {
            setCurrFrancIndex(prev => prev - 1)
            setCursor(0)
        }
        if (cursor === 0 && leftPress && currFrancIndex === 0 && cursorLvl === 1) {
            setCurrFrancIndex(games.length - 1)
            setCursor(0)
        }
    }, [leftPress])

    useEffect(() => {
        if (cursorLvl < 3 && downPress) {
            setCursorLvl(prev => prev + 1)
        } else if (cursorLvl === 3 && downPress) {
            setCursorLvl(0)
        }
    }, [downPress])

    useEffect(() => {
        if (cursorLvl > 0 && upPress) {
            setCursorLvl(prev => prev - 1)
        } else if (cursorLvl === 0 && upPress) {
            setCursorLvl(3)
        }
    }, [upPress])


    useEffect(() => {
        imageSet(data[0].background_image, data[0].title_icon, data[0].title)
    }, [data])

    return (
        <>
            <Row className='m-0 d-flex flex-column'>
                <Col className='d-flex flex-row justify-content-start align-items-start'>
                    {
                        data && data.map((game, i) => {
                            if (i === cursor && cursorLvl === 1) {
                                imageSet(game.background_image, game.title_icon, game.title)
                            }
                            return (
                                <div
                                    key={game.title}
                                    className={i === cursor && cursorLvl === 1 ? 'm-1 active logoDiv' : 'm-1 logoDiv'}
                                    onClick={() => {
                                        imageSet(game.background_image, game.title_icon, game.title)
                                        setCursor(i)
                                    }}
                                >
                                    <img
                                        className={i === cursor && cursorLvl === 1 ? 'logoImgActive' : 'logoImg'}
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
                    <img
                        className={cursorLvl === 2 && 'isActiveCursor'}
                        src={titleImg}
                        alt='title'
                        height={200}
                        width={200}
                    />
                    <Button
                        className={cursorLvl === 3 ? 'my-3 py-2 buy-button-active' : 'my-3 py-2 buy-button'}
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