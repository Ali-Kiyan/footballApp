import React, { Component } from 'react';
import AdminLayout from '../../../HoC/AdminLayout';
import FormField from '../../misc/formFields';
import { validate } from '../../misc/utility';
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../misc/firebaseLooper';


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
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: [{key: 1, value: "option 1"}]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select away team',
                    name: 'select_away',
                    type: 'select',
                    options: [{key: 1, value: "option 1"}]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {key: 'W', value: 'W'},
                        {key: 'L', value: 'L'},
                        {key: 'D', value: 'D'},
                        {key: 'N/A', value: 'N/A'}
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        {key: 'Yes', value: 'Yes'},
                        {key: 'No', value: 'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }
    updateForm(element){
        const newFormdata = {...this.state.formData}; 
        const newElement = {...newFormdata[element.id]}
        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement; 
        this.setState({
            formError: false,
            formData: newFormdata
        })
    }

    updateFields(match, teamOptions, teams, type, matchId){
        const newFormdata = {
            ...this.state.formData
        }
        for (let key in newFormdata){
            if(match){
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true;
            }
            if(key === 'local' || key === 'away'){
                newFormdata[key].config.options = teamOptions
            }
        }
        this.setState({
            matchId,
            formType: type,
            formData: newFormdata,
            teams
        })
    }

    componentDidMount(){
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then(snapshot => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];
                snapshot.forEach((childSnapshot) => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value:  childSnapshot.val().shortName
                    })
                })
                this.updateFields(match, teamOptions, teams, type, matchId)
            })
        }
        if(!matchId){
            getTeams(false, 'Add Match')
        }else{
            firebaseDB.ref(`matches/${matchId}`).once('value').then((snapshot) => {
                const match = snapshot.val();
                getTeams(match, 'Edit Match');
            })
        }
    }

    successForm(msg){
        this.setState({
            formSuccess: msg
        });
        setTimeout( ()=> {
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }





    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for(let key in this.state.formData ){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid ;
        }
        this.state.teams.forEach((team)=> {
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        if(formIsValid){
            if(this.state.formType === 'Edit Match'){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit).then((res)=> {
                    this.successForm('Updated correctly');
                }).catch((e)=>{
                    this.setState({
                        formError: true
                    })
                })
            }else{
                firebaseMatches.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_matches');
                }).catch((e)=>{
                    this.setState({
                        formError: true
                    })
                })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }

    
    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event)=> {
                            this.submitForm(event)
                        }}>
                            <FormField 
                                id={'date'}
                                formdata={this.state.formData.date}
                                change={(element)=> this.updateForm(element)
                                        }
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                    <FormField 
                                        id={'local'}
                                        formdata={this.state.formData.local}
                                        change={(element)=> this.updateForm(element)
                                                }
                                    />
                                    </div>
                                    <div>
                                    <FormField 
                                        id={'resultLocal'}
                                        formdata={this.state.formData.resultLocal}
                                        change={(element)=> this.updateForm(element)
                                                }
                                    />
                                    </div>
                             
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                    <FormField 
                                        id={'away'}
                                        formdata={this.state.formData.away}
                                        change={(element)=> this.updateForm(element)
                                                }
                                    />
                                    </div>
                                    <div>
                                    <FormField 
                                        id={'resultAway'}
                                        formdata={this.state.formData.resultAway}
                                        change={(element)=> this.updateForm(element)
                                                }
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="split_fields">
                                            <FormField 
                                                id={'referee'}
                                                formdata={this.state.formData.referee}
                                                change={(element)=> this.updateForm(element)
                                                        }
                                            />
                                            <FormField 
                                                id={'stadium'}
                                                formdata={this.state.formData.stadium}
                                                change={(element)=> this.updateForm(element)
                                                        }
                                            />
                            </div>
                            <div className="split_fields last">
                                            <FormField 
                                                id={'result'}
                                                formdata={this.state.formData.result}
                                                change={(element)=> this.updateForm(element)
                                                        }
                                            />
                                            <FormField 
                                                id={'final'}
                                                formdata={this.state.formData.final}
                                                change={(element)=> this.updateForm(element)
                                                        }
                                            />
                            </div>
                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ? 
                                <div className="error_label">
                                    something went wrong
                                </div>
                                : ''
                            }
                            <div className="admin_submit">
                                <button onClick={(event)=>this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>




                          
                            
                        </form>
                    </div>
                </div>
              
            </AdminLayout>
        );
    }
}

export default AddEditMatch;
