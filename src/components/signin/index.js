import React, { Component } from 'react';
import FormField from '../misc/formFields';
import { validate } from '../misc/utility';
import { firebase } from '../../firebase';

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

    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for(let key in this.state.formdata ){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid ;
        }
        if(formIsValid){
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=>{
                //this is rendering dashbaord component because this component is directly 
                // referenced in the react router. if you were to render a compoennt from the childeren of the 
                // wrapped in react router you have to pick a different method.
                this.props.history.push("/dashboard")
            })
            .catch(err=>{
                this.setState({
                    formError: true,

                })
            })
        }else{
            this.setState({
                formError: true
            })
        }
    }

    updateForm(element){
        const newFormdata = {...this.state.formdata}; 
        const newElement = {...newFormdata[element.id]}
        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement; 
        this.setState({
            formError: false,
            formdata: newFormdata
        })
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
                            { this.state.formError ? <div className="error_label">Something is wrong</div> : null }
                            <button onClick={(event)=> this.submitForm(event)}>Log in</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
