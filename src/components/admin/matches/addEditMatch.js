import React, { Component } from 'react';
import AdminLayout from '../../../HoC/AdminLayout';
import FormField from '../../misc/formFields';
import { validate } from '../../misc/utility';


export class AddEditMatch extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date',
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }
    render() {
        return (
            <AdminLayout>
                <FormField 
                            id={'date'}
                            formdata={this.state.formData.date}
                            change={(element)=> this.updateForm(element)
                            }
                />
            </AdminLayout>
        );
    }
}

export default AddEditMatch;
