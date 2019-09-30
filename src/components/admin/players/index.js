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
import { firebaseMatches, firebase } from '../../../firebase';
import { firebaseLooper } from '../../misc/firebaseLooper';
import { reverseArray } from '../../misc/utility';

export class AdminPlayers extends Component {
    render() {
        return (
            <div>
                players
            </div>
        );
    }
}

export default AdminPlayers;
