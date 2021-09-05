import React from "react";
import "./editable-item.css";
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { Tooltip } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InsertLinkIcon from '@material-ui/icons/InsertLink';


const EditableItem = (props) => {
    const { name, changeTitle, removeNode, addChild, addChildtwo, senddata } = props;

    const attributStatut = props.seqAttribut == undefined ? false : true

/**
 *  {
              (attributStatut==true) ? (
                  <IconButton
                style={{marginLeft:5}}
                disabled={attributStatut}
                className="EditableItem-Button EditableItem-Button_add">
                <PlaylistAddOutlinedIcon />
              </IconButton>
              ) :
                (<IconButton
                style={{marginLeft:5}}
                disabled={attributStatut}
                className="EditableItem-Button EditableItem-Button_add"
                onClick={addChild}>
                <PlaylistAddOutlinedIcon />
              </IconButton>)
            }*/
 

    return (
        <div className="EditableItem">
        
          <Tooltip title={ !attributStatut?"Ajouter sous groupe":"Clé seqentiel"} arrow>       
            <IconButton
              //disabled={attributStatut}
               className="EditableItem-Button EditableItem-Button_add"
               onClick={()=> {if(!attributStatut){addChildtwo()}else{return}}}>
                 {!attributStatut?(
                 <AddIcon />
                 ):(<InsertLinkIcon style={{fill:"#3DB2FF"}} />)
                 }
            </IconButton>
            </Tooltip> 
            
            
            
            <InputBase
              className="EditableItem-Text"
              onChange={(e) => { if(!attributStatut){changeTitle(e.target.value)}else {return } }}
              value={name}
              //disabled={attributStatut}
              placeholder="New Item"
            />
            {!attributStatut?(
            <Tooltip title={"Ajouter Clés sequentielles"} arrow> 
           
              <IconButton
                style={{marginLeft:5}}
                //disabled={attributStatut}
                className="EditableItem-Button EditableItem-Button_add"
                onClick={addChild}>
                <PlaylistAddOutlinedIcon />
              </IconButton>
            </Tooltip> 
             ):(<> </>)}
            <Tooltip title={"Supprimer groupe"} arrow>  
            <IconButton
             style={{marginLeft:10}}
              className="EditableItem-Button EditableItem-Button_remove" 
              onClick={removeNode}>
                <CancelOutlinedIcon />
             </IconButton>
             </Tooltip> 
            

        </div>
    );
}

export default EditableItem;
