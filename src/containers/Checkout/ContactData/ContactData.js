import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();       
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Adam Webb',
                address: {
                    street: '123 Test St',
                    zipcode: '27555',
                    country: 'US'
                },
                email: 'webb@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (                
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your name'></input>
                <input className={classes.Input} type='text' name='email' placeholder='Your e-mail'></input>
                <input className={classes.Input} type='text' name='street' placeholder='Street Addredd'></input>
                <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'></input>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Info</h4>
                {form}
            </div>
        )
    }    
}

export default ContactData;