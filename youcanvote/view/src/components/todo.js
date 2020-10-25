import React, { Component } from 'react';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import MyDialog from './MyDialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';
import counties from '../counties.json'
import {scryRenderedComponentsWithType} from "react-dom/test-utils";
import SmartSelect from "./SmartSelect";
const styles = (theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    submitButton: {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: 14,
        right: 10
    },
    floatingButton: {
        position: 'fixed',
        bottom: 0,
        right: 0
    },
    form: {
        width: '98%',
        marginLeft: 13,
        marginTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    root: {
        minWidth: 470
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    pos: {
        marginBottom: 12
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    dialogeStyle: {
        maxWidth: '50%'
    },
    viewRoot: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class todo extends Component {
    constructor(props) {
        super(props);

        this.state = {

            todos: '',
            title: '',
            body: '',
            todoId: '',
            errors: [],
            open: false,
            location:'',
            uiLoading: true,
            buttonType: '',
            viewOpen: false,
            myCounties:{ counties},
            selectedCountyOption:null,
            selectedLocationOption:null,
            selectedCategoryOption:null,
            selectedPriorityOption:null,
            selectedStatusOption:null,
            dialogDisplayData:'',
        };

        this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
        this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
        this.handleViewOpen = this.handleViewOpen.bind(this);
    }
      updateState = ((newLocation, name) => {
           this.setState({[name]:newLocation})

     })

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    componentWillMount = () => {
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/todos')
            .then((response) => {

                this.setState({
                    todos: response.data,
                    uiLoading: false
                });

            })
            .catch((err) => {
                console.log(err);
            });
    };


    deleteTodoHandler(data) {
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        let todoId = data.todo.todoId;
        axios
            .delete(`todo/${todoId}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleEditClickOpen(data) {
        this.setState({
            title: data.todo.title,
            body: data.todo.body,
            county:data.todo.county,
            location:data.todo.location,
           category:data.todo.category,
           priority:data.todo.priority,
            status:data.todo.status,
            todoId: data.todo.todoId,
            buttonType: 'Edit',
            open: true
        });
    }

    handleViewOpen(data) {
        console.log( "data :" + data + " end")
        this.setState({
            dialogDisplayData:data,
            viewOpen: true
        });
    }

    render() {
        const { selectedCountyOption } = this.state;

        const DialogTitle = withStyles(styles)((props) => {
            const { children, classes, onClose, ...other } = props;
            return (
                <MuiDialogTitle disableTypography className={classes.root} {...other}>
                    <Typography variant="h6">{children}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
            );
        });

        const DialogContent = withStyles((theme) => ({
            viewRoot: {
                padding: theme.spacing(2)
            }
        }))(MuiDialogContent);

        dayjs.extend(relativeTime);
        const { classes } = this.props;
        const { open, errors, viewOpen } = this.state;

        const handleClickOpen = () => {
            this.setState({
                todoId: '',
                title: '',
                body: '',
                county:'',
                location:'',
                category:'',
                priority:'',
                status:'',
                buttonType: '',
                open: true
            });
        };

        const handleSubmit = (event) => {
            authMiddleWare(this.props.history);
            event.preventDefault();
            const userTodo = {
                title: this.state.title,
                body: this.state.body,
                county: this.state.county,
                location: this.state.location,
                category: this.state.category,
                priority: this.state.priority,
                status: this.state.status
            };
            console.log(userTodo);
            let options = {};
            if (this.state.buttonType === 'Edit') {
                options = {
                    url: `/todo/${this.state.todoId}`,
                    method: 'put',
                    data: userTodo
                };
            } else {
                options = {
                    url: '/todo',
                    method: 'post',
                    data: userTodo
                };
            }
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios(options)
                .then(() => {
                    this.setState({ open: false });
                    window.location.reload();
                })
                .catch((error) => {
                    this.setState({ open: true, errors: error.response.data });
                    console.log(error);
                });
        };

        const handleViewClose = () => {
            this.setState({ viewOpen: false });
        };

        const handleClose = (event) => {
            this.setState({ open: false });
        };

        if (this.state.uiLoading === true) {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
                </main>
            );
        } else {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <IconButton
                        className={classes.floatingButton}
                        color="primary"
                        aria-label="Add Todo"
                        onClick={handleClickOpen}
                    >
                        <AddCircleIcon style={{ fontSize: 60 }} />
                    </IconButton>
                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    {this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
                                </Typography>
                                <Button
                                    autoFocus
                                    color="inherit"
                                    onClick={handleSubmit}
                                    className={classes.submitButton}
                                >
                                    {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="todoTitle"
                                        label="Todo Title"
                                        name="title"
                                        autoComplete="todoTitle"
                                        helperText={errors.title}
                                        value={this.state.title}
                                        error={errors.title ? true : false}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                    <Grid item xs={12}>
                                            <InputLabel id="demo-simple-select-label">County</InputLabel>
                                        <SmartSelect
                                            name = 'county'
                                            options = {counties.rules}
                                            selected={this.state.location && {"label": this.state.county, "value": this.state.county}}
                                            setter={this.updateState}>
                                        </SmartSelect>
                                    </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                    <SmartSelect
                                        name = 'location'
                                        options={[{
                                            "label": "LOCATION", "value": "location"
                                           },
                                            {
                                                "label": "test","value": "TEST"
                                            }]}
                                        selected={this.state.location && {"label": this.state.location, "value": this.state.location}}
                                        setter={this.updateState}>
                                    </SmartSelect>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <SmartSelect
                                        name = 'category'
                                        options={[ {
                                            "label": "Aggressive Engineering",
                                            "value": "AGGREsSIVE ENGINEERING",
                                            "color": '#FF5630', "isFixed": true
                                        } ,
                                            {
                                                "label": "Police Presence",
                                                "value": "POLICE PRESENCE",
                                                "color": '#FFC400'
                                            } ,
                                            ]}
                                        selected={this.state.category && {"label": this.state.category, "value": this.state.category}}
                                        setter={this.updateState}>
                                    </SmartSelect>
                                </Grid>


                                <Grid item xs={12}>
                                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                    <SmartSelect
                                        name = 'priority'
                                        options={[
                                        {
                                            "label": "Critical",
                                            "value": "Critical",
                                            "color": '#FF5630', "isFixed": true
                                        } ,
                                        {
                                            "label": "high",
                                            "value": "High",
                                            "color": '#FFC400'
                                        } ,

                                    ]}
                                        selected={this.state.priority && {"label": this.state.priority, "value": this.state.priority}}
                                        setter={this.updateState}>
                                    </SmartSelect>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                    <SmartSelect
                                    name = 'status'
                                    options = {[
                                    {
                                        "label": "in progress",
                                        "value": "in progress", "color": '#FFC400'
                                    } ,
                                    {
                                        "label": "resolved",
                                        "value": "resolvd",color: '#00875A'
                                    } ,

                                ]}
                                    selected={this.state.status && {"label": this.state.status, "value": this.state.status}}
                                    setter={this.updateState}>
                                </SmartSelect>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="todoDetails"
                                        label="Todo Details"
                                        name="body"
                                        autoComplete="todoDetails"
                                        multiline
                                        rows={25}
                                        rowsMax={25}
                                        helperText={errors.body}
                                        error={errors.body ? true : false}
                                        onChange={this.handleChange}
                                        value={this.state.body}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Dialog>

                    <Grid container spacing={2}>
                        {this.state.todos.map((todo) => (
                            <Grid item xs={12} sm={6}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {todo.title}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {dayjs(todo.createdAt).fromNow()}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`${todo.body.substring(0, 65)}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`${todo.county.substring(0, 65)}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`${todo.location.substring(0, 65)}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`${todo.category.substring(0, 65)}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`${todo.priority.substring(0, 65)}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`${todo.status.substring(0, 65)}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => this.handleViewOpen({ todo })}>
                                            {' '}
                                            View{' '}
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ todo })}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => this.deleteTodoHandler({ todo })}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                 <MyDialog setter={handleViewClose} items={this.state.dialogDisplayData}  viewOpen={ viewOpen}/>

                </main>
            );
        }
    }
}

export default withStyles(styles)(todo);
