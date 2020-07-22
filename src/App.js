import React, {Component} from 'react';
import ListContacts from './ListContacts';
import CreateContacts from './CreateContacts';
import { Route } from 'react-router-dom';
import './index.css';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component{
    
    state={
        contacts: []
    }

    componentDidMount(){
        ContactsAPI.getAll().then((contacts) => {
            this.setState({contacts: contacts})
        })
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => (c.id !== contact.id))
        }))
    
        ContactsAPI.remove(contact)
    }

    createContact(contact){
        ContactsAPI.create(contact).then(contact => {
            this.setState(state => ({
                contacts: state.contacts.concat([ contact ])
            }))
        })
    }

    render(){
        return(
            <div>
                <Route exact path="/" render={() => (
                    <ListContacts 
                        contacts={this.state.contacts} 
                        onDeleteContact={this.removeContact}
                    />  
                )} />
                
                <Route path="/create" render={({ history }) => (
                    <CreateContacts 
                        onCreateContact={(contact) => {
                            this.createContact(contact)
                            history.push('/')
                        }}
                    />
                )} />  
            </div>

        );
    }
}

export default App;
