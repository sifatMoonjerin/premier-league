import React from 'react';
import TeamStat from '../TeamStat/TeamStat';
import CircularProgress from '@material-ui/core/CircularProgress';

const MatchTable = () => {
    return (
        <div>
            <h1>Table</h1>
            <CircularProgress />
            <TeamStat/>
        </div>
    );
};

export default MatchTable;