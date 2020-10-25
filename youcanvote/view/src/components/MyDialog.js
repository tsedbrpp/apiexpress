import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import React from "react";
//import DialogTitle from "@material-ui/core/DialogTitle";
//import DialogContent from "@material-ui/core/DialogContent";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

/*const MyDialog =( (props) => {
    if(props.items == '')
        return(<div></div>);*/


/*<Dialog
    onClose={props.setter}
    aria-labelledby="customized-dialog-title"
    open={props.viewOpen}
    fullWidth
   // classes={{ paperFullWidth: classes.dialogeStyle }}
>
    <DialogTitle id="customized-dialog-title" onClose={props.setter}>
        {props.items.todo.title}
    </DialogTitle>
    <DialogContent dividers>
        <TextField
            fullWidth
            id="todoDetails"
            name="body"
            multiline
            readonly
            rows={1}
            rowsMax={25}
            value={props.items.todo.body}
            InputProps={{
                disableUnderline: true
            }}
        />
    </DialogContent>
</Dialog>
  )
})*/



const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

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
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


    const MyDialog =( (props) => {

            const [open, setOpen] = React.useState(false);


 const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
            if(props.items == '')
                return(<div></div>);

    return (
        <div>


            <Dialog onClose={props.setter} aria-labelledby="customized-dialog-title" open={props.viewOpen}>
                <DialogTitle id="customized-dialog-title" onClose={props.setter}>
                    {props.items.todo.title}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {props.items.todo.body}.
                    </Typography>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
}
    )

export default MyDialog
