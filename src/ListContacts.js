import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EscapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component{

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    }
    
    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    render(){   
                 
        const {contacts, onDeleteContact} = this.props;
        const { query } = this.state;
        let showingContacts

        if(query){
            const match = new RegExp(EscapeRegExp(query), 'i') // i is for case-insensitive. 
            // For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
            showingContacts = contacts.filter((contact) => (match.test(contact.name)))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))
        
        return(
            <div className="list-contact">
                <div className="list-contacts-top">
                    <input 
                        className="search-contacts"
                        type="text"
                        placeholder="Search contacts"
                        value={query}
                        onChange={(event) => (this.updateQuery(event.target.value))}
                    />

                    <Link 
                        to="/create"
                        className="add-contact">
                    Create Contacts
                    </Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span> Now showing {showingContacts.length} of {contacts.length} total </span>
                        <button onClick={this.clearQuery}> Show all </button>
                    </div>
                )}

                <ol className="contact-list"> 
                    {showingContacts.map((contact) => (                         // initally the code was:- {contacts.map((contact) => ( but contacts will just render all the contacts
                    <li className="contact-list-item" key={contact.id}>
                        <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}} />
                        <div className="contact-details">
                            <p> {contact.name}</p>
                            <p> {contact.email}</p>
                        </div>
                        <button className="contact-remove" onClick={() => (onDeleteContact(contact))}>
                            remove
                        </button>
                    </li>
                    ))}
                </ol>
            </div>
        );
    }
}

ListContacts.propTypes ={
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts;