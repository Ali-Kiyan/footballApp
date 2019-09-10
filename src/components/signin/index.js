import React, { Component } from 'react';
import FormField from '../misc/formFields';


export class SignIn extends Component {

    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            email:  {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password:  {
                element: 'input',
                value: '',
                config: {
                    name: 'passport_input',
                    type: 'passport',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    render() {
        return (
            <div>
                sign in
            </div>
        );
    }
}

export default SignIn;
