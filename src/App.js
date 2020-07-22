import React, { useState, useEffect } from 'react';
import './App.css';
import MatchTable from './components/MatchTable/MatchTable';
import axios from 'axios';


function App() {
  const [allMatches, setAllMatches] = useState([])
  const [teamStats, setTeamStats] = useState({})

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json')
    .then(res => {
      const stats = {};
      const rounds = res.data.rounds;
      const matches = rounds.map(round => round.matches.map(match => {
        console.log(match)
        let t1, t2;
        if(match.score.ft[0] > match.score.ft[1]){
          t1 = 'win';
          t2 = 'loss';} 
        else if(match.score.ft[0] < match.score.ft[1]){
          t1 = 'loss';
          t2 = 'win';
        } else{
          t1 = 'draw';
          t2 = 'draw';
        }
        console.log(match.team1)
        if(!stats[match.team1]){
          stats[match.team1] = {win:0,loss:0,draw:0};
        }
        if(!stats[match.team2]){
          stats[match.team2] = {win:0,loss:0,draw:0};
        }
        
        stats[match.team1][t1] += 1;
        stats[match.team2][t2] += 1;
        
        return match;
      })).flat()
      setAllMatches(matches)
      setTeamStats(stats)
    })
  }, [])

  return (
    <div className="App">
      <h1>Premier League 2015/16</h1>
      <MatchTable allMatches={allMatches} teamStats={teamStats}/>
    </div>
  );
}

export default App;
