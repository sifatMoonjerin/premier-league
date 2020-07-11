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
        let t1, t2;
        if(match.score1 > match.score2){
          t1 = 'win';
          t2 = 'loss';} 
        else if(match.score1 < match.score2){
          t1 = 'loss';
          t2 = 'win';
        } else{
          t1 = 'draw';
          t2 = 'draw';
        }
        
        if(!stats[match.team1.name]){
          stats[match.team1.name] = {win:0,loss:0,draw:0};
        }
        if(!stats[match.team2.name]){
          stats[match.team2.name] = {win:0,loss:0,draw:0};
        }
        
        stats[match.team1.name][t1] += 1;
        stats[match.team2.name][t2] += 1;
        
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
