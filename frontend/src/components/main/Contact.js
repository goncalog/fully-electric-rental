import React from 'react';
import ContactForm from '../support/ContactForm';
import CallToActionButton from '../support/CallToActionButton';
import '../../css/Contact.css';
import validateEmail from '../../utils/validateEmail';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            messageText: '',
        }
        this.handleEmailTextChange = this.handleEmailTextChange.bind(this);
        this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
        this.handleSendMessageButtonClick = this.handleSendMessageButtonClick.bind(this);
    }

    handleEmailTextChange(emailText) {
        this.setState({ emailText })
    }

    handleMessageTextChange(messageText) {
        this.setState({ messageText })
    }

    handleSendMessageButtonClick() {
        // Validate email provided
        if (!validateEmail(this.state.emailText)) {
            alert('Please provide a valid email.');
            return;
        }

        // Validate message provided
        if (this.state.messageText === '') {
            alert('Please provide a message.');
            return;
        }

        // Send data to backend
        let url = (process.env.NODE_ENV === 'production') 
                ? `/content/owner/${this.props.match.params.id}/contact`
                : `${process.env.REACT_APP_SERVER_URL}/content/owner/${this.props.match.params.id}/contact`;
        
        const data = { 
            from: this.state.emailText,
            to: (this.props.location.state) ? this.props.location.state.contact : '',
            subject: 'Contact',
            text: this.state.messageText,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => {
                console.log('Success:', response);
                alert("Your message was successfully sent. You will be contacted soon.");
                this.setState({ emailText: '', messageText: '' });
            })
            .catch((error) => {
                console.error('Error:', error);
            });        
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="contact">
                <ContactForm 
                    legend="Send your message:" 
                    emailText={this.state.emailText} 
                    messageText={this.state.messageText}
                    onEmailTextChange={this.handleEmailTextChange} 
                    onMessageTextChange={this.handleMessageTextChange} 
                />
                <CallToActionButton 
                    callToActionText="Send Message"
                    onButtonClick={this.handleSendMessageButtonClick}  
                />
            </div>
        );
    }
}
