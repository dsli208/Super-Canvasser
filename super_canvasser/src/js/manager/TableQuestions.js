import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {AddCircle, Edit} from '@material-ui/icons';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'question', numeric: false, disablePadding: false, label: 'Question' },
  { id: 'answer', numeric: false, disablePadding: false, label: 'Answer' },
];


function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50 + 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class EnhancedTableToolbar extends React.Component {
  state = {
    addOpen: false,
    locationId: this.props.locationId,
    questionTobeAdd: '',
    isFilled: true,
    addSuccess: false,
  }

  handleAddQuestion = () => {
    var question = this.state.questionTobeAdd;

    if (question.length === 0) {
      console.log('Please enter a question!');
      this.setState({isFilled: false, addSuccess: false})
      setTimeout(() => {
        this.setState({ addSuccess: false,  })
      }, 2000);
      return;
    }
    this.setState({isFilled: true, addSuccess: true}, () => {
      question = question.replace(/ /g, '+');
      var query = '/locations/' + this.state.locationId + '/questions/add';
      query += `?question=${question}&answer=`;
      fetch(query).then(res => res.json()).catch(err => console.log(err));
      console.log('Add question successfully');
      
      this.props.load(true);
    })
    setTimeout(() => {
      this.setState({ addOpen: false, addSuccess: false,  questionTobeAdd: ''})
    }, 2000);
  }

  handleTFChange = (event) => {
    this.setState({questionTobeAdd: event.target.value})
  }

  render() {
    const { numSelected, classes } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {/*---------------------- Modal for add question ---------------------------- */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.addOpen}
          onClose={()=>this.setState({addOpen: false})}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Grid container justify='center'>
              <Typography variant='display2' id="modal-title">
                Add new question
              </Typography>
            </Grid>
            <Grid container justify='center'>
              <TextField
                  onChange={this.handleTFChange}
                  className = 'question'
                  label='Enter question'
                  style={{minWidth: '80%'}} />
            </Grid>
            <Grid container justify='center'>
              {this.state.addSuccess ?
                <FormHelperText id="component-success-text">New question just added successfully!</FormHelperText> :null}
              {this.state.isFilled ? 
                null : <FormHelperText id="component-error-text">Please fill in the question!</FormHelperText> }
            </Grid>
            <Grid container justify='center'>
              <Button onClick={this.handleAddQuestion} variant="contained" color="primary" style={{marginTop: '30px', marginRight: '15px'}} > Add </Button>
              <Button onClick={()=>this.setState({addOpen:false})} variant="contained" color="default" style={{marginTop: '30px'}} > Close </Button>
            </Grid>
          </div>
        </Modal>
        
        {/* ----------------------------- Table header------------------------------- */}
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography id="tableTitle">
              List of questions
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        {/* ----------------------------- Edit button------------------------------- */}
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Edit">
              <IconButton aria-label="Edit">
                <Edit />
              </IconButton>
            </Tooltip>
          ): null }
        </div>
        {/* ----------------------------- Delete button------------------------------- */}
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add question">
              <IconButton onClick={() => this.setState({addOpen: true, addSuccess: false, isFilled: true})} aria-label="Add question">
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class TableQuestions extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    locationId: this.props.locationId,
  };

  componentWillMount(props) {
    var qaList = [];
    var i = 0;
    this.props.questionAnswer.forEach(qa => {
      qa['id'] = i;
      qaList.push(qa);
      i++;
    })
    this.setState({
      data: qaList
    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected }, () => console.log(this.state.selected));
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          locationId={this.state.locationId}
          numSelected={selected.length} 
          load={(isChanged) => {
            this.props.load(isChanged)
          }} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      
                      <TableCell> {n.question} </TableCell>
                      <TableCell> {n.answer} </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

TableQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableQuestions);

