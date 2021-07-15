import React, { useEffect, useState, useRef } from 'react';
import { useEffectAsync } from './reactHelper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    displayTree:{
        padding: '10px',
    },
    nameWrapper: {
        paddingLeft: '5px',
        marginBottom: '10px',
    },
    nameWrapperString: {
        borderLeft: 'solid grey 1px',
        marginTop: '20px',
        paddingLeft: '5px'
    },
    element: {
        display: 'flex'
    },
    Add: {
        display: 'flex',
        opacity: '0',
        '&:hover':{
            opacity: '1',
        }
    },
    AddFolder: {
        color: 'green',
        marginLeft: '15px'
    },
    AddSubFolder: {
        color: 'blue',
        marginLeft: '15px'
    },
    UpdateFolder: {
        color: 'orange',
        marginLeft: '15px'
    },
    DeleteFolder: {
        color: 'red',
        marginLeft: '15px'
    },
    input: {
        display: 'none'
    },
    inputShow: {
        display: 'flex'
    },
  }));

function AddTree(data, id, newChild, isSub, isUpdate, newName, isDelete ) {
    if (!id) {
        data.push(newChild)
        return
    }
    for (const prop in data) {
        const value = data[prop].id
        if (value === id) {
            if(isDelete === true)
                data.splice(data.findIndex(item => item.id === id), 1)
            else if (isUpdate === true)
                data[prop].name = newName
            else if (isSub === true)
                data[prop].child.push(newChild)
            else if (isSub === false)
                data.push(newChild)
            return 
        }
        else
            AddTree(data[prop].child, id, newChild, isSub, isUpdate, newName, isDelete)
    }
    return 
}

var randomHex = length => (
    '0'.repeat(length) 
    + Math.floor((Math.random() * 16 ** length))
    .toString(16)
).slice(-length);

function Input({show, handleClick, items, setName}) {
    const classes = useStyles();

    if (show === 4) {
        return (
            <div className={(show === 0 && show < 4) ? classes.input : classes.inputShow}>
                <div>You want to delete the groupe</div>
                <div className={classes.AddFolder} onClick={handleClick}>✔</div>
        </div>
        )
    }

    return (
        <div className={(show === 0 && show < 4) ? classes.input : classes.inputShow}>
            <select name="sequentiel" id="sequentiel" onChange={(e) => setName(e.target.value)} className={classes.select}>
                <option value className={classes.selected}>Select a Sequentiel Number</option>
                {items.filter((word) => word.name.startsWith('S*')).map((item, id) => (
                    <option key={id} value={item.name.substring(2)}>{item.name.substring(2)}</option>
                ))}
            </select>
            <div className={classes.AddFolder} onClick={handleClick}>✔</div>
            <style jsx>
                {`
                    select{
                        max-width: 150px;
                    }
                    select option:first-child{
                        display: none;
                    }
                `}
            </style>
        </div>
    )
}

function AddButton({ handleCheck, id, items }) {
    const classes = useStyles();
    const [show, setShow] = useState(0)
    const [name, setName] = useState('')

    const handleClick = () => {
        const newChild = {
            name: name,
            id: randomHex(10),
            child: []
        }
        if (show === 4)
            handleCheck(id, false, false, false, false, true)
        else if (show === 1)
            handleCheck(id, newChild, true, false, false, false)
        else if (show === 2)
            handleCheck(id, newChild, false, false, false, false)
        else if (show === 3)
            handleCheck(id, false, false, true, "newName", false)
        setShow(0)
    }

    return (
        <div>
            <div className={classes.Add}>
                <div className={classes.AddFolder} onClick={() => setShow(1)}>+</div>
                <div className={classes.AddSubFolder} onClick={() => setShow(2)}>+</div>
                <div className={classes.UpdateFolder} onClick={() => setShow(3)}>○</div>
                <div className={classes.DeleteFolder} onClick={() => setShow(4)}>x</div>
            </div>
            <Input show={show} setShow={setShow} handleClick={handleClick} id={id} items={items} setName={setName} />
        </div>
    )
}

function DisplayTree({data, handleCheck, items}) {
    const classes = useStyles();
    return (
        <div className={classes.displayTree}>
            {data.map((elem, id) => (
                <div key={id} className={(id < data.length - 1 &&  elem.child.length > 0) ? classes.nameWrapperString : classes.nameWrapper}>
                <div key={id} className={classes.element}>
                    <div key={id} >{elem.name}:</div>
                    <AddButton id={elem.id} handleCheck={handleCheck} items={items} />
                </div>
                    {(elem.child.length > 0) &&
                        <DisplayTree data={elem.child} handleCheck={handleCheck} items={items} />
                    }
                </div>
            ))}
        </div>
    )
}


const data = [
    {id:"eJnlf2Dck9", name: "groupe default", child: []}
]

function SeqTree(props) {
    const [copy, setCopy] = useState(data)
    const [items, setItems] = useState([])
    const [updateTimestamp, setTimeStamp] = useState(Date.now())
    useEffectAsync(async () => {
            const response = await fetch('/api/drivers');
            if (response.ok) {
                  const res =  await response.json()
                  setItems(res);
                }
              }, [updateTimestamp]);
            const handleCheck = (id, newChild, isSub, isUpdate, newName, isDelete) => {
                AddTree(data, id, newChild, isSub, isUpdate, newName, isDelete)
                setCopy([...data])
            }
    return (
        <div>
            <DisplayTree data={copy} original={data} handleCheck={handleCheck} items={items} />
        </div>
    )
}

export default SeqTree
