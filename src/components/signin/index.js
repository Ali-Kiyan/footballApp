import React, { Component } from 'react';
import FormField from '../misc/formFields';
import { validate } from '../misc/utility';



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

    submitForm(){
        
    }

    updateForm(){
        
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="signin_wrapper" style={{margin: '100px'
                    }}>
                        <form onSubmit={ (event)=> this.submitForm(event) }>
                            <h2>Please log in</h2>
                            <FormField 
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element)=> this.updateForm(element)
                            }
                            />
                            <FormField 
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element)=> this.updateForm(element)
                            }
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
