import React from "react";
import EditableItem from "../editable-item";
import "./tree-node.css";
import { Collapse, List, ListItem } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IconButton } from "@material-ui/core";

const TreeNode = ({ children, ...otherProps }) => {
    const hasChildren = children !== undefined;
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
         setOpen(!open);
      };


    const renderChildren = (children) => {
        return (
           <>
          {open ? <IconButton  style={{position:'absolute', marginTop:'-26px',marginLeft:'-22px', width:20,height:20}} onClick={handleClick}> <ExpandLess style={{fill:'#39A2DB'}} /> </IconButton> : <IconButton style={{position:'absolute', marginTop:'-26px',marginLeft:'-22px',width:20,height:20}} onClick={handleClick}><ExpandMore style={{fill:'#39A2DB'}} /> </IconButton>}
           <Collapse in={open} timeout="auto">
               <ul>
                { children.map((nodeProps) => {
                    const { id, ...others } = nodeProps;
                    return (
                        <TreeNode 
                          key={id}
                          {...others}
                        />
                    );
                }) }
                 </ul>
            </Collapse>
           </>
        );
    }        

    return (
        <List>
           
            <div className="TreeNode">
                <EditableItem {...otherProps} />
            </div>
            {hasChildren && renderChildren(children)}
            
        </List>
    );
}

export default TreeNode;