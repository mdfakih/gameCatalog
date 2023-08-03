import React from 'react'
import { Col, Row } from 'reactstrap'

const Header = ({ data, currFrancIndex, setCurrFrancIndex, setCurrFranchise }) => {
    console.log('main', data)
    return (
        <Row style={{ height: 60 }} className='m-0 d-flex flex-row justify-content-between align-items-center'>
            <Col className='d-flex flex-row '>
                {data && data.map((game, i) => {
                    if (i === currFrancIndex) {
                        setCurrFranchise(game)
                    }
                    return (
                        <p
                            className={i === currFrancIndex ? 'm-3 fs-4 fw-bold text-primary' : 'm-3 fs-5 fw-light text-light'}
                            key={game.franchisee}
                            onClick={() => {
                                setCurrFranchise(game)
                                setCurrFrancIndex(i)
                            }}
                        >
                            {game.franchisee}
                        </p>
                    )
                })}
            </Col>
            <Col className='d-flex flex-row align-items-center justify-content-end'>
                <p>icons</p>
            </Col>
        </Row>
    )
}

export default Header