import React, { Component } from 'react';
import ImageInput from './ImageInput';
import { Link } from 'react-router-dom';
import serializeform from 'form-serialize';

class CreateContacts extends Component{
    handleSubmit = (e) => {
        e.preventDefault()   // so that the passed detail will not go in the URL
        const values = serializeform(e.target, { hash:true }) //here hash:true will give us the object of our passed details in the form.
        //console.log(values)
        if (this.props.onCreateContact){
            this.props.onCreateContact(values)
        }
    }

    render(){
        return(
            <div>
                <Link className="close-create-contact" to="/">Close </Link>
                <form onSubmit={this.handleSubmit} className="create-contact-form"> 
                    <ImageInput
                        className="create-contact-avatar-input"
                        maxheight={64}
                        name="avatarURL"
                    />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <button> Add Contact </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateContacts;