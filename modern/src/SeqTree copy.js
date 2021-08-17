import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckboxSelectionGrid from './checkSelection';
//import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ color:"#39A2DB" ,width: 22, height: 22 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  /* const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  }); */

  return (
    <div >
      <Collapse {...props} />
    </div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */

  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))
((props) => 
<div >
<TreeItem style={{display:"inline-block"}} {...props} TransitionComponent={TransitionComponent} /> 
</div>
);

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});
//data

export default function CustomizedTreeView() {
  const classes = useStyles();
  const [id,setid]=useState("")
  const data = {
    id: 'root',
    name: 'Base_ONEP',
    children: [
     
      {
        id: '1',
        name: 'Casablanca',
        children: [
          {
             id:"c1"          
          },
          {
            id: '2',
            name: 'C_groupe_1',
            children: [
              {
                id:"c2"         
              },
              {
                id: '3',
                name: 'C_groupe_2',
                children: [
                  {
                    id:"c3"     
                  },
                  {
                    id: '4',
                    name: 'C_groupe_3',
                    children: [
                      {
                        id:"c4"  
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [datacheck,setdatacheck]=useState([])

  const findTreeNode=(data)=>{
    var lisa=data;
    if(lisa.id==id)
    {
      if(lisa.children)
      {lisa={...lisa,children:lisa.children.concat(datacheck)}}
      else{
        lisa={...lisa,children:datacheck}
      }; 
      console.log(lisa) ;return lisa 
    }
    else if(Array.isArray(lisa.children)){
      lisa.children.forEach((node) => findTreeNode(node)) 
    }
  }
  /* const replacedata=(data)=>{
    const x=findtreeNode(data);
    if(x.id==data.id){
      data.children=x.children
    }
    else {
       if(Array.isArray(data.children)){
        data.children.forEach((node) => replacedata(node)) 
    }
  } */

  const selection=(open,handleClose,id)=>(
    <div>
      <Dialog
        disableEnforceFocus  //this is very important in datagrids and dialogue
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id+" - Outil de selection de clés sequentiells"}</DialogTitle>
        <DialogContent>
           <CheckboxSelectionGrid model={setdatacheck} />
        </DialogContent>
        <DialogActions>
          
        <Button onClick={handleClose} color="primary" autoFocus>
            Annuler
          </Button>
          <Button onClick={()=>{if(datacheck){findTreeNode(data)}}} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  
  const renderTree = (nodes) => (
    <>
    <StyledTreeItem defaultSelected  onNodeSelect={(e,v)=>console.log(e,v)} onClick={()=>{if(!nodes.name){setOpen(true);setid(nodes.id)}}} key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
    </>
  );
  
  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
    >
      {renderTree(data)}
      { selection(open,handleClose,id) }
    </TreeView>
  );
}
