import React, { useState } from 'react'

const ToDoList = (props) => {
    // First determine what can be in state. ==> input box // list of todo items // checkbox 

    const [newToDo, setNewToDo] = useState({ toDoItems: "", isComplete: false }); //input box 
    const [toDoItems, setToDoItems] = useState([{ toDoItems: "take out the trash", isComplete: false }, { toDoItems: "take out the trash", isComplete: false }, { toDoItems: "walk the dog", isComplete: false }]); //list of items for to do list 
    const [inputText, setInputText] = useState("")



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
        <div>
            <h1>TO DO LIST: </h1>
            {/* <strong>toDoItems: </strong> {JSON.stringify(toDoItems)} */}
            <hr />
            <hr />
            {/* <strong>newToDo: </strong>{JSON.stringify(newToDo)} */}
            {/* <strong>newToDo: </strong>{JSON.stringify(inputText)} */}

            <form onSubmit={(e) => {
                handleNewSubmit(e)
            }}>
                <input onChange={(e) => {
                    setInputText(e.target.value);
                }} type="text"
                    value={inputText} /> {/* newToDo is a whole object that has todoitems */}
                <div>
                    <button>Add</button>
                </div>
            </form>
            {toDoItems.map((newToDo, index) => {
                return (
                    <div key={index}>
                        <input
                            onChange={(e) => {
                                handleCheckBox(index);
                            }} checked={newToDo.isComplete} //toDoItems is the array of objects 
                            type="checkbox" />
                        <p style={{ textDecoration: toDoItems[index].isComplete ? "line-through" : "none" }}> {/* toDoItems = need to access the state value so it can be changed. */} 
                            {newToDo.toDoItems}
                        </p>
                        <button onClick={(e) => { // 
                            handleDeleteTask(index); //need to pass in index so that our function knows which item to delete. 
                        }}>Delete</button> {/* newtodo is representing the whole object, need to append todoitems */}
                    </div>
                )
            })}
        </div>
    );
}

export default ToDoList