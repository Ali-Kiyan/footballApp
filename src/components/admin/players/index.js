import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HoC/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebasePlayers, firebase } from '../../../firebase';
import { firebaseLooper } from '../../misc/firebaseLooper';
import { reverseArray } from '../../misc/utility';

export class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players: []
    }

    componentDidMount(){
        firebasePlayers.once('value').then( (snapshot) => {
            const players = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                players: reverseArray(players)
            })
        })
    }


    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Number</TableCell>
                                        <TableCell>Position</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { this.state.players ? 
                                            this.state.players.map((player, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Link to={`/admin_players/add_players/${player.id}`}> {player.lastname} </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        {player.lastname}
                                                    </TableCell>
                                                    <TableCell>
                                                        {player.number}
                                                    </TableCell>
                                                    <TableCell>
                                                        {player.position}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        : null
                                    }
                                    <TableRow>

                                    </TableRow>

                                </TableBody>

                            </TableHead>
                        </Table>
                        <div className="admin_progress">
                            {this.state.isLoading ? <CircularProgress thickness={7} style={{
                                color: '#98c5e9'
                            }}/> : '' }
                        </div>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminPlayers;
