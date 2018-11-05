import React from 'react';
import results from '../../data/results.json';
import Canvasser from './Canvasser';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';




function ResultRow(result) {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h1>{result.name}</h1>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <ul>
              {result.statistics.map((statistic, idx) => {
                return (
                  <li key={idx}>
                    average {statistic.average} <br/>
                    deviation {statistic.std} <br/>
                    percentageYes {statistic.percentageyes} <br/>
                    percentageNo {statistic.percentageno} <br/>
                    <ul>
        
                    </ul>
                  </li>
                )
              })}
              </ul>
            </Grid>
  
            
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }







class CanvasserResultsList extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        results: [],
        resultRow: []
      }
    }
    componentDidMount() {
      this.setState({
        results: results.results
      },() => {
        var resultsList = []
        {this.state.results.forEach(result => {
          var row = <ResultRow key={result.id} {...result}/>
          resultsList.push(row)
        })}
        this.setState({
            resultRow: resultsList
        })
      })
    }
    render() {
      return (
        <div>
          <Canvasser/>
          <div>
            {this.state.resultRow}
          </div>
        </div>
      );
    };
  }


  
export default CanvasserResultsList;