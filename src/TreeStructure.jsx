import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions, IconButton, SvgIcon, TextField, Snackbar } from '@material-ui/core';
export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const result = {
    maxId: 4,
    id: 'root',
    name: 'Parent',
    children: [
        {
            id: '1',
            name: 'Child - 1',
        },
        {
            id: '3',
            name: 'Child - 3',
            children: [
                {
                    id: '4',
                    name: 'Child - 4',
                },
            ],
        },
    ],
};

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function TreeStructure() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [node, setNode] = React.useState({});
    const [data, setData] = React.useState(result);
    const [isView, setView] = React.useState(false);
    const [name, setName] = React.useState('');
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [openSnack, setOpenSanck] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [isSuccess, setSucess] = React.useState('');
    const handleSnackClick = () => {
        setOpenSanck(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSanck(false);
    };
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={
            <div>
                <Typography>
                    {`${nodes.name}`}
                    <IconButton title="Show Detail" aria-label="Show Detail" onClick={(e) => nodePopup(e, nodes)}>
                        <SvgIcon>
                            <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z" />
                        </SvgIcon>
                    </IconButton>
                    <IconButton title="Add" aria-label="Add" onClick={(e) => insertPopup(e, nodes)}>
                        <SvgIcon>
                            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </SvgIcon>
                    </IconButton>
                </Typography>
            </div>
        }
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem >
    );
    const nodePopup = (e, node) => {
        handleClickOpen();
        setName('');
        setView(true);
        setNode(node);
        e.stopPropagation();
    }
    const insertPopup = (e, node) => {
        handleClickOpen();
        setName('');
        setView(false);
        setNode(node);
        e.stopPropagation();
    }
    const insertChild = (e) => {
        if (name.trim() === '') {
            handleSnackClick(true);
            setMessage('Please Enter Name');
            setSucess(false);
        }
        else {
            const { maxId } = data;
            const newMaxId = maxId + 1;
            if (!node.children) {
                node.children = [];
            }
            node.children = [...node.children, { id: newMaxId.toString(), name: name }];
            data.maxId = newMaxId;
            setData(data);
            setMessage('Record Successfully Saved');
            handleSnackClick(true);
            setSucess(true);
            handleClose();
            e.stopPropagation();
        }
    }
    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <React.Fragment>

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {renderTree(data)}
            </TreeView>
            <Dialog disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {node.name}
                </DialogTitle>

                {isView === true ? (
                    <div>
                        <DialogContent dividers>
                            {Array.isArray(node.children) ?
                                node.children.map((child) => (
                                    <Typography key={child.id} gutterBottom>
                                        {child.name}
                                    </Typography>
                                ))
                                : <Typography gutterBottom>
                                    No Children
                        </Typography>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Close
          </Button>
                        </DialogActions></div>) :
                    <div>
                        <DialogContent dividers>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="email"
                                fullWidth
                                value={name}
                                onChange={handleChange}
                                required
                                inputProps={{ maxLength: 50 }}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Close
  </Button>
                            <Button autoFocus onClick={insertChild} color="primary">
                                Save
  </Button>
                        </DialogActions></div>}
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={isSuccess ? "success" : "error"} >
                    {message}
                </Alert>

            </Snackbar>
        </React.Fragment >
    );
}
