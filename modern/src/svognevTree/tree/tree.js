import React, { Component, useEffect } from "react";
import TreeNode from "../tree-node";
import AddButton from "../add-button";
import ControlPanel from "../control-panel";
import TextView from "../text-view";
import "./tree.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckboxSelectionGrid from "../../checkSelection";
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import MainToolbar from "../../MainToolbar";


//start from here
class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: this.initializedСopy([]),
            savedNodes: [],
            open:false,
            selected:[],
            staticId:"",
            loading:false,

        }
        this.changeTitle = this.changeTitle.bind(this);
        this.addRootElement = this.addRootElement.bind(this);
        this.addChild = this.addChild.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.addChildtwo=this.addChildtwo.bind(this);
        this.saveState = this.saveState.bind(this);
        this.loadState = this.loadState.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.nodesToString = this.nodesToString.bind(this);
    }

     componentDidMount(){
        this.loadState()
    }

    initializedСopy(nodes, location) {
        const nodesCopy = [];
        for (let i = 0; i < nodes.length; i++) {
            const { children, name } = nodes[i];
            const hasChildren = children !== undefined;
            const id = location ? `${location}.${i + 1}` : `${i + 1}`;
            nodesCopy[i] = { 
                    children: hasChildren ? this.initializedСopy(children, id) : undefined,
                    changeTitle: this.changeTitle(id),
                    removeNode: this.removeNode(id),
                    addChild: this.addChild(id),
                    addChildtwo: this.addChildtwo(id),
                    id:id,
                    name,
            };
        }
        return nodesCopy;
    }

    changeTitle(id) {
        return (newTitle) => {
            id = id.split(".").map((str) => parseInt(str));
            const nodes = this.initializedСopy(this.state.nodes);
            let changingNode = nodes[id[0] - 1];

            if (id.length > 1) {
                for (let i = 1; i < id.length; i++) {
                    changingNode = changingNode.children[id[i] - 1];
                }
            }

            changingNode.name = newTitle;
            this.setState({ nodes });
        };
    }
    
    

   

    addRootElement() {
        const id = this.state.nodes.length ? `${this.state.nodes.length + 1}` : "1";
        const newNode = { 
            children: undefined,
            changeTitle: this.changeTitle(id),
            removeNode: this.removeNode(id),
            addChild: this.addChild(id),
            addChildtwo: this.addChildtwo(id),
            id:id,
            name: "",
        };
        
        const nodes = [...this.state.nodes, newNode];
        this.setState({ nodes });
    }

    addChild(id) {
        
        return () => {
/* 
            id = id.split(".").map((str) => parseInt(str));
            const nodes = this.initializedСopy(this.state.nodes);
            let changingNode = nodes[id[0] - 1];

            if (id.length > 1) {
                for (let i = 1; i < id.length; i++) {
                    changingNode = changingNode.children[id[i] - 1];
                }
            } 
            if (changingNode.children === undefined) {
                changingNode.children = [];
            } */
            
            this.setState({staticId:id})
            this.setState({open:true})
        }
    }
    
    addSeq(ids,selection){
        return () => {
            
            const id = ids.split(".").map((str) => parseInt(str));
            const nodes = this.initializedСopy(this.state.nodes);
            let changingNode = nodes[id[0] - 1] || [];

            if (id.length > 1) {
                for (let i = 1; i < id.length; i++) {
                    changingNode = changingNode.children[id[i] - 1];
                }
            }

            if (changingNode.children === undefined) {
                changingNode.children = [];
            }
           //console.log(changingNode.name)
           for(var i=0;i<selection.length;i++){
            var idd = `${id.join(".")}.${changingNode.children.length + 1}`;
            
            fetch('/flsk/histoEntite',{method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                SeqId:selection[i].uniqueId,
                Centre:changingNode.name,
                Date:new Date().toLocaleDateString("fr-FR",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})
            })
        })

            changingNode.children = [
                ...changingNode.children,
                { 
                    children: undefined,
                    changeTitle: this. changeTitle(idd),
                    removeNode: this.removeNode(idd),
                    addChild: this.addChild(idd),
                    addChildtwo: this.addChildtwo(idd),
                    id:idd,
                    name: selection[i].name,
                }];
            }

            //this.setState({ nodes });
            this.setState({ nodes });

            
        }

         
    }
    // 
    handleClose=()=>{
        this.setState({open:false})
    }
    handleCallback = (childData)=> {
        
            
        this.setState({selected: childData})
        
    }
  
      selection = (open,handleClose) => {return (
        <div>
            
          <Dialog
            disableEnforceFocus  //this is very important in datagrids and dialogue
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{this.state.staticId+" - Outil de selection de clés sequentiells"}</DialogTitle>
            <DialogContent>
                <CheckboxSelectionGrid model={this.handleCallback} /> 
               
            </DialogContent>
            <DialogActions>
              
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
              </Button>
               <Button  onClick={this.addSeq(this.state.staticId,this.state.selected)} color="primary" autoFocus> 
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
     } 

     addChildtwo(id) {
        return () => {
            id = id.split(".").map((str) => parseInt(str));
            const nodes = this.initializedСopy(this.state.nodes);
            let changingNode = nodes[id[0] - 1];

            if (id.length > 1) {
                for (let i = 1; i < id.length; i++) {
                    changingNode = changingNode.children[id[i] - 1];
                }
            }

            if (changingNode.children === undefined) {
                changingNode.children = [];
            }
            
            id = `${id.join(".")}.${changingNode.children.length + 1}`;

            changingNode.children = [
                ...changingNode.children,
                { 
                    children: undefined,
                    changeTitle: this.changeTitle(id),
                    removeNode: this.removeNode(id),
                    addChild: this.addChild(id),
                    addChildtwo: this.addChildtwo(id),
                    id:id,
                    name: "",
                }];

            this.setState({ nodes });
        }
    }
    


    removeNode(id){
        return () => {
            if(id!="1"){
                id = id.split(".").map((str) => parseInt(str));
                const nodes = this.initializedСopy(this.state.nodes);
    
                if (id.length === 1) {
                    const newNodes = [
                        ...nodes.slice(0, [id[0] - 1]),
                        ...nodes.slice(id[0])
                    ];
    
                    this.setState( { nodes: this.initializedСopy(newNodes) } );
    
                } else {
                    let changingNode = nodes[id[0] - 1];
                    
                    for (let i = 2; i < id.length; i++) {
                        changingNode = changingNode.children[id[i - 1] - 1];
                    }
    
                    const index = id[id.length - 1] - 1;
    
                    const newChildren = [
                        ...changingNode.children.slice(0, index),
                        ...changingNode.children.slice(index + 1),
                    ];
                    changingNode.children = newChildren;
    
                    this.setState({ nodes: this.initializedСopy(nodes) });
            }
        }
    }

    }

    saveState() {
        //console.log((this.state.nodes))
        //this.setState({ savedNodes: this.initializedСopy(this.state.nodes) });
        fetch('/flsk/entites/1',
        {method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({arr:this.simplify(this.state.nodes)})
        })
        
        
    }
    

    loadState() {
        this.setState({loading:true})
        //this.setState({ nodes: this.initializedСopy(this.state.savedNodes) });
        fetch('/flsk/entites',{method:"GET"})
        .then(res => res.json())
        .then(res=>this.setState({ nodes: this.initializedСopy(res[0].arr) }))
        this.setState({loading:false})
    }

    onTextChange(e) { 
        this.setState({ nodes: this.initializedСopy(JSON.parse(e.target.value)) });
    }

    nodesToString() {
        return JSON.stringify(this.simplify(this.state.nodes), undefined, 2);
    }

    simplify(nodes) {
        const nodesCopy = [];
        for (let i = 0; i < nodes.length; i++) {
            const { children, name ,id} = nodes[i];
            const hasChildren = children !== undefined && children.length > 0;
            nodesCopy[i] = { 
                name,
                id,
                children: hasChildren ? this.simplify(children) : undefined,
            };
        }
        return nodesCopy;
    }

    render() {
        const { nodes, savedNodes, selected } = this.state;
        const { addRootElement, saveState, 
                loadState, onTextChange, nodesToString} = this;
        const hasSaved = savedNodes.length !== 0;

        return (
            <>
            <MainToolbar />
            {!this.state.loading?(
            <div className="Tree">
            
                <div className="Tree-LeftSide">
                <ControlPanel {...{ hasSaved, saveState, loadState }} />
                  <ul className="Nodes">
                    { nodes.map((nodeProps) => {  
                     const { id, ...others } = nodeProps;
                      return (                       
                        <TreeNode key={id} {...others} />  
                      );})    
                    }
                  </ul>
                  <AddButton onClick={addRootElement} />
                  {this.selection(this.state.open,this.handleClose)}
               </div>
               
               <div className="Tree-RightSide">
                   <TextView
                     value={nodesToString()}
                     onChange={onTextChange}
                   />
               </div>
            </div>
            ):(<LinearProgress />)}
            </>
        );
    }
}

export default Tree;