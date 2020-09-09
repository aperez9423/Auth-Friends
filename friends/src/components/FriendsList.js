import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

import styled from 'styled-components';

class FriendsList extends React.Component {

    state ={
        friends: [],
        newFriend: {
            id: Date.now(),
            name: '',
            age: '',
            email: ''
        }
    }

    componentDidMount() {
        this.getFriends();
    }

    getFriends = () => {
        axiosWithAuth()
            .get('/friends')
            .then(res => {
                console.log({ res });
                this.setState({ 
                    friends: res.data
                });
            })
            .catch(err => console.log ({ err }));
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            newFriend: {
                ...this.state.newFriend, 
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = e => {
       e.preventDefault();

       axiosWithAuth()
        .post('/friends', this.state.newFriend)
        .then(res => {
            this.setState({
                friends: res.data,
                newFriend: {
                    id: Date.now(),
                    name:'',
                    age: '',
                    email:''
                }
            });
        });
    };

    render() {
        return (
        <Friend>
            <Heading>My Friends List</Heading>
            <Form onSubmit = {this.handleSubmit}>
                <h4>Add a Friend</h4>
                <label>
                    Name: 
                </label>
                <input
                    type = 'text'
                    name = 'name'
                    value = {this.state.newFriend.name}
                    onChange = {this.handleChange}>
                </input>
                <label>
                    Age: 
                </label>
                <input
                    type = 'text'
                    name = 'age'
                    value = {this.state.newFriend.age}
                    onChange = {this.handleChange}>
                </input>
                <label>
                    Email: 
                </label>
                <input
                    type = 'text'
                    name = 'email'
                    value = {this.state.newFriend.email}
                    onChange = {this.handleChange}>
                </input>
                <Button>Add a New Friend</Button>
            </Form>
            {this.state.friends.map (friend => {
                return  <Box>
                        <Name>{friend.name}</Name>
                        <Age>{friend.age}</Age>
                        <Email>{friend.email}</Email>
                    </Box>
            })}
        </Friend>
        )
    }
}

export default FriendsList;

const Friend = styled.div`
    margin: 3rem;
    background-color: purple;
    border: .4rem solid black;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`
const Heading = styled.h1`
    width: 100vw;
    color: white;
    font-size: 4rem;
`

const Form = styled.form`
    min-width: 80vw;
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
    margin-bottom: 2rem;
`

const Box = styled.div`
    margin: 2rem;
    width: 15vw;
    height: 15vw;
    border: .2rem solid black;
    border-radius: .5rem;
    background-color: white;
    display: flex; 
    justify-content: center;
    flex-direction: column;
    align-text: center;
    align-items: center;
`
const Name = styled.h3`
    font-size: 2rem;
`
const Age =styled.p`
    font-size: 1.3rem;
`

const Email =styled.p`
    font-size: 1.4rem;
`