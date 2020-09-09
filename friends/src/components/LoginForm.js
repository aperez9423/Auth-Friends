import React from 'react';
import axios from 'axios';

import styled from 'styled-components';

class LoginForm extends React.Component{
    state = {
        credentials: {
            username: "",
            password: ""
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials, 
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/login', this.state.credentials)
            .then((res) => {
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/protected')
            })
            .catch((err) => console.log(err))
    };

render() {
    return (
        <Container>
            <Form onSubmit={this.login}>
                Username: 
                <input
                    type = 'text'
                    name = 'username'
                    value = {this.state.credentials.username}
                    onChange = {this.handleChange}
                />
                Password:
                <input
                    type = 'text'
                    name = 'password'
                    value = {this.state.credentials.password}
                    onChange = {this.handleChange}
                />
                <Button>Log In</Button>
               </Form>
        </Container>
        );
    };
};

export default LoginForm;

const Container = styled.div`
    margin: 3rem;
`

const Form = styled.form`
    border: .2rem solid black;
    border-radius: .5rem;
    background-color: lightgray;
    display: flex; 
    flex-direction: column;
    align-text: center;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    font-size: 1.4rem;

    h4 {
        font-size: 2.2rem;
    }

    label {
        font-size: 1.5rem;
    }

    input {
        margin: 1rem;
        margin-bottom: 2rem;
        font-size: 2rem;
    }
`

const Button = styled.button `
    border: .2rem solid black;
    border-radius: .5rem;   
    font-size: 1.5rem;
    background-color: white;
`