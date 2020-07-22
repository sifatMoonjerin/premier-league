import React, { useState } from 'react';
import './MatchTable.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import StatModal from '../StatModal/StatModal';

const useStyles = makeStyles({
    table: {
      width: '800px',
      boxShadow: '5px 5px 20px lightgray',
      marginBottom: '50px'
    }
  });

const MatchTable = ({allMatches, teamStats}) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [team, setTeam] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const openModal = event => {
        setTeam(event.target.text)
        setIsOpen(true)
        event.preventDefault();
    }

    const closeModal = () => {
        setTeam('')
        setIsOpen(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='tableContainer'>
            <StatModal 
                isOpen={isOpen} 
                closeModal={closeModal} 
                team={team} 
                teamStats={teamStats}
            />

            {
                !allMatches.length && <CircularProgress />
            }

            {   
                !!allMatches.length && <TableContainer className={classes.table} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Date</strong></TableCell>
                            <TableCell align="center"><strong>Teams</strong></TableCell>
                            <TableCell align="center"><strong>Score</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {allMatches
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((match) => (
                            <TableRow key={`${match.team1} v ${match.team2}`}>
                                <TableCell align="center" component="th" scope="row">
                                    {match.date}
                                </TableCell>
                                <TableCell align="center">
                                    <a href='#' onClick={openModal} className='teamName'>
                                        {match.team1}
                                    </a>
                                    <span>{' vs '}</span>
                                    <a href='#' onClick={openModal} className='teamName'>
                                        {match.team2}
                                    </a>
                                </TableCell>
                                <TableCell align="center">
                                    <span className='score'>{`${match.score.ft[0]} - ${match.score.ft[1]}`}</span>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5,10,20,50,100]}
                        component="div"
                        count={allMatches.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>
            }
        </div>
    );    
};

export default MatchTable;