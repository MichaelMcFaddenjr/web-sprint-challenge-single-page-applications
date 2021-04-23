import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const ButtonWrapper = styled.button`
background-color: white;
border: 1px solid black;
margin: 1rem;
padding: 0.5rem;
`

export default function Header() {
    return (
        <header>
            <h1> Lambda Eats </h1>
            <ButtonWrapper><Link className="home-button" to="/">Home</Link></ButtonWrapper>
            <ButtonWrapper><Link className="form-button" to="/pizza">Order Pizza</Link></ButtonWrapper>
        </header>
    )
}