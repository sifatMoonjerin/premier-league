import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import StatModal from '../StatModal/StatModal';

const MatchTable = () => {
    return (
        <div>
            <h1>Table</h1>
            <CircularProgress /> 
            <StatModal/>
        </div>
    );    
};

export default MatchTable;