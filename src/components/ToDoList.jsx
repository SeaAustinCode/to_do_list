import React, { useState } from 'react'

const ToDoList = (props) => {
    // First determine what can be in state. ==> input box // list of todo items // checkbox 

    const [newToDo, setNewToDo] = useState({ toDoItems: "", isComplete: false }); //input box 
    const [toDoItems, setToDoItems] = useState([{ toDoItems: "Take out the trash", isComplete: false }, { toDoItems: "Make Dinner", isComplete: false }, { toDoItems: "Walk the dog", isComplete: false }]); //list of items for to do list 
    const [inputText, setInputText] = useState("")
    // const [inputErrors, setInputErrors] = useState({})

    // const validate = (inputText) => {
    //     const errors = {};
    //     if (!inputText) {
    //         errors.toDoItmes = "Must provide a to do item!"
    //     }
    //     return errors;
    // }


    // CREATE
    const handleNewSubmit = (e) => { // we need something to handle 
        e.preventDefault(); // prevent default behaviour (refreshing)
        const toDoObject = {
            toDoItems: inputText, // this needs to follow line 7 convention 
            isComplete: false
        }
        setToDoItems([...toDoItems, toDoObject]) // spread the todoitems array and add the new to do item to it. 
    }

    // DELETE
    const handleDeleteTask = (index) => {
        const filteredToDoItems = toDoItems.filter((todoitem, i) => {
            return i != index; // whenever i is not equal to the item I want to delete... keep the item 
        });
        setToDoItems(filteredToDoItems) // setToDoItems to the new array which has been filtered. 
    }

    // UPDATE-ish 
    const handleCheckBox = (index) => {
        const updatedTodos = toDoItems.map((todo, i) => {
            if (index == i) {
                todo.isComplete = !todo.isComplete;
                // const updatedTodo = { ...todo, complete: !todo.complete };
                // return updatedTodo;
            }
            return todo;
        });
        setToDoItems(updatedTodos);
    }


    return (
        <div className='form-container'>
            <h1 className='header'>TO DO: </h1>

            <form onSubmit={(e) => {
                handleNewSubmit(e)
            }}>
                <input className='form-container input-field'
                    onChange={(e) => {
                        setInputText(e.target.value);
                    }} type="text"
                    value={inputText} /> {/* newToDo is a whole object that has todoitems */}
                    {/* <p className='form-container label'>Add new To Do item</p> */}
                    <button>Add</button>
            </form>
            {toDoItems.map((newToDo, index) => {
                return (
                    <>
                        <div key={index} className="checkList">
                            <input className="checkmark"
                                onChange={(e) => {
                                    handleCheckBox(index);
                                }} checked={newToDo.isComplete} //toDoItems is the array of objects 
                                type="checkbox" />
                            <p style={{ textDecoration: toDoItems[index].isComplete ? "line-through" : "none" }}> {/* toDoItems = need to access the state value so it can be changed. */}
                                {newToDo.toDoItems}
                            </p>
                            <div>
                                <button onClick={(e) => { // 
                                    handleDeleteTask(index); //need to pass in index so that our function knows which item to delete. 
                                }}>Delete</button> {/* newtodo is representing the whole object, need to append todoitems */}
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    );
}

export default ToDoList