import React, { Component } from 'react';
import AdminLayout from '../../../HoC/AdminLayout';
import FormField from '../../misc/formFields';
import { validate } from '../../misc/utility';
import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';
import Fileuploader  from '../../misc/fileuploader';

export class AddEditPlayers extends Component {
    state = {
        playerID: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Lastname',
                    name: 'lastname_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player number',
                    name: 'number_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key: "keeper", value: "keeper"},
                        {key: "Defence", value: "Defence"},
                        {key: "Midfield", value: "Midfield"},
                        {key: "Striker", value: "Striker"}
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                value: true
            }
        }
    }
    updateFields = (player, playerID, formType, defaultImg) => {
        const newFormData = { ...this.state.formData };
        for( let key in newFormData){
            newFormData[key].value = player[key];
            newFormData[key].valid = true
        }
        this.setState({
            playerID,
            defaultImg,
            formType,
            formData: newFormData
        })

        
    }
    componentDidMount(){
        const playerid = this.props.match.params.id;
        if(!playerid){
           this.setState({
               formType: 'Add Player'
           })
        }else{
            firebaseDB.ref(`players/${playerid}`).once('value').then( snapshot => {
                const playerData = snapshot.val();
                firebase.storage().ref('players').child(playerData.image).getDownloadURL()
                .then( (url) => {
                    this.updateFields(playerData, playerid, 'Edit Player', url)
                } )
                .catch(e=>{
                    this.updateFields({ ...playerData, image: ''}, playerid, 'Edit Player', '')
                })
            })
        }
    }

    updateForm(element, content = ''){
        const newFormdata = {...this.state.formData}; 
        const newElement = {...newFormdata[element.id]}
        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }

        let validData = validate(newElement);
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement; 
        this.setState({
            formError: false,
            formData: newFormdata
        })
    }

    successForm = (msg) => {
        this.setState({
            formSuccess: msg
        })
        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            })
        },2000)
    }

    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for(let key in this.state.formData ){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid ;
        }
        if(formIsValid){
            if(this.state.formType === "Edit Player"){

                firebaseDB.ref(`players/${this.state.playerID}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated Successfully') 
                })
                .catch(e=>{
                    this.setState({
                        formError: true
                    })
                })

            }else{
                firebasePlayers.push(dataToSubmit).then( () => {
                    this.props.history.push('/admin_players')
                }).catch(e=>{
                    this.state.formError = true;
                })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }
    resetImage(){
        const newFormdata = { ...this.state.formData }
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormdata
        })
    }

    storeFilename(filename){
        this.updateForm( {id: 'image'} ,filename )
    }
 

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(e)=>{
                            this.submitForm(e);
                        }}>
                            <Fileuploader dir="players" tag={"player image"} 
                            defaultImg={this.state.defaultImg}
                            defaultImgName={this.state.formData.image.value}
                            resetImage={()=>{this.resetImage()}}
                            filename={(filename)=>{this.storeFilename(filename)}}
                            
                            />
                            <FormField
                                id={'name'}
                                formdata={this.state.formData.name}
                                change={(element)=> this.updateForm(element)
                                        }
                            />
                                                        <FormField 
                                id={'lastname'}
                                formdata={this.state.formData.lastname}
                                change={(element)=> this.updateForm(element)
                                        }
                            />
                                                        <FormField 
                                id={'number'}
                                formdata={this.state.formData.number}
                                change={(element)=> this.updateForm(element)
                                        }
                            />
                             <FormField 
                                        id={'position'}
                                        formdata={this.state.formData.position}
                                        change={(element)=> this.updateForm(element)
                                                }
                             />
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

export default AddEditPlayers;
