import React, { useEffect, useState } from 'react'
import { Col, Collapse, Nav, NavItem, NavLink, Navbar, NavbarText, NavbarToggler } from 'reactstrap'
import { CiSearch, CiSettings } from 'react-icons/ci'
import Avatar from 'react-avatar'
import moment from 'moment'
import useKeyPress from '../hooks/useKeyPress'

const Header = ({ data, currFrancIndex, setCurrFrancIndex, setCurrFranchise, cursorLvl }) => {
    console.log('main', data)

    const [collapsed, setCollapsed] = useState(true)
    const toggleNavbar = () => setCollapsed(!collapsed)

    const leftPress = useKeyPress("ArrowLeft")
    const rightPress = useKeyPress("ArrowRight")
    const [cursorHeader, setCursorHeader] = useState(currFrancIndex)

    useEffect(() => {
        setCurrFrancIndex(cursorHeader)
    }, [cursorHeader])

    useEffect(() => {
        if (data.length && rightPress && cursorLvl === 0) {
            setCursorHeader(prev => prev + 1)
        }
        if (cursorHeader === data.length - 1 && rightPress && cursorLvl === 0) {
            setCursorHeader(0)
        }
    }, [rightPress])

    useEffect(() => {
        if (data.length && leftPress && cursorLvl === 0) {
            setCursorHeader(prev => prev - 1)
        }
        if (cursorHeader === 0 && leftPress && cursorLvl === 0) {
            setCursorHeader(data.length - 1)
        }
    }, [leftPress])

    return (
        <Navbar expand={"md"}>
            <Col className='d-flex flex-row '>
                {data && data.map((game, i) => {
                    if (i === currFrancIndex) {
                        setCurrFranchise(game)
                    }
                    return (
                        <p
                            className={i === currFrancIndex && cursorLvl === 0 ? 'm-3 fs-6 fw-bold text-light headActive' : i === currFrancIndex ? 'm-3 fs-6 fw-bold text-light' : 'm-3 fs-6 fw-light text-secondary'}
                            style={{ cursor: 'pointer' }}
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
            <NavbarToggler onClick={toggleNavbar} className="me-2" />
            <Collapse className='justify-content-end' isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="#"><CiSearch color='#FFFFFF' size={25} /></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"><CiSettings color='#FFFFFF' size={25} /></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <Avatar name="Gamer" size={25} round="50%" />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <NavbarText className='text-light'>{moment().format('LT')}</NavbarText>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header