import React from 'react';
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
      width: 800,
      boxShadow: '5px 5px 20px lightgray'
    }
  });

const MatchTable = ({allMatches, teamStats}) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className='matchTable'>
            <StatModal/>
            {!allMatches.length && <CircularProgress />} 
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
                            <TableRow key={`${match.team1.key} v ${match.team2.key}`}>
                                <TableCell align="center" component="th" scope="row">
                                    {match.date}
                                </TableCell>
                                <TableCell align="center">
                                    <a href='#'>{match.team1.name}</a>
                                    <span>{' vs '}</span>
                                    <a href='#'>{match.team2.name}</a>
                                </TableCell>
                                <TableCell align="center">
                                    <span className='score'>{`${match.score1} - ${match.score2}`}</span>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={allMatches.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                    />
                </TableContainer>
            }
        </div>
    );    
};

export default MatchTable;