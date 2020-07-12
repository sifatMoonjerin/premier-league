import React from 'react';
import './StatModal.css';
import Modal from 'react-modal';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

Modal.setAppElement('#root')

const StatModal = ({ isOpen, closeModal, team, teamStats }) => {
    return (
        <Modal
            isOpen={isOpen} 
            onRequestClose={closeModal}
            className='modalClass'
        >
            {
                !!team && (
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell 
                                    align="center" 
                                    colspan="4" 
                                    className='teamTitle'
                                >
                                    <strong>{team}</strong>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><strong>{'Played'}</strong></TableCell>
                                <TableCell align="center"><strong>{'Win'}</strong></TableCell>
                                <TableCell align="center"><strong>{'Loss'}</strong></TableCell>
                                <TableCell align="center"><strong>{'Draw'}</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" component="th" scope="row">
                                    {teamStats[team]['win']+teamStats[team]['loss']+teamStats[team]['draw']}
                                </TableCell>
                                <TableCell align="center">
                                    {teamStats[team]['win']}
                                </TableCell>
                                <TableCell align="center">
                                    {teamStats[team]['loss']}
                                </TableCell>
                                <TableCell align="center">
                                    {teamStats[team]['draw']}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )
            }
        </Modal>
    );
};

export default StatModal;