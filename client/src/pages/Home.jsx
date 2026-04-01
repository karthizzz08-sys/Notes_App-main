import React, { useEffect, useState } from 'react'
import "./../index.css"
import { LuSearch, LuPlus, LuPencil, LuX } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Home = () => {
    const [updateDialogBox, setUpdateDialogBox] = useState(false);
    const [addDialogBox, setAddDialogBox] = useState(false);
    const [notes, setNotes] = useState([]);

    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDesc, setUpdateDesc] = useState("");

    const [selectedID, setSelectedID] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    function openAddNote() {
        setAddDialogBox(!addDialogBox)
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/get-note")
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [setNotes])

    function handleAddNote() {
        try {
            const newNote = { id: notes.length + 1, title, description };
            fetch("http://127.0.0.1:5000/post-note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newNote)
            })
                .then(res => res.json())
                .then(data => {
                    setNotes([...notes, data]);
                    setTitle("");
                    setDescription("");
                });
            alert("Note added successfully!");
            openAddNote();
            window.location.reload();
        } catch (error) {
            alert("Error adding note:", error);
        }
    }

    function handleDelete(id) {
        console.log(id)
        try {
            fetch(`http://127.0.0.1:5000/del-note/${id}`, {
                method: "DELETE",
            }).then(res => res.json)
            // .then(data => alert(data))
            window.location.reload()
        } catch (err) {
            alert(err)
        }
    }

    function handleUpdateNote(id) {
        console.log(id)
        try {
            const updatedNote = { title: updateTitle, description: updateDesc, id: id };
            fetch(`http://127.0.0.1:5000/update-note/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedNote)
            }).then(res => res.json())
            setUpdateDialogBox(false)
            window.location.reload()
        } catch (error) {
            // alert(error)
            console.log(error)
        }
    }

    function openUpdateNote(data) {
        setUpdateDialogBox(!updateDialogBox)
        setUpdateTitle(data?.title)
        setUpdateDesc(data?.description)
        setSelectedID(data?.id)
        console.log(data.id)
    }

    return (
        <div>
            <div>
                <header>
                    <h1 className='logo-text'>Notes Panel</h1>
                    <div className="search-parent">
                        <LuSearch className='search-icon' />
                        <input type="text" className='input-search' />
                    </div>
                    <div></div>
                </header>
                <main>
                    <div className="plus-icon-parent">
                        <LuPlus className='plus-icon' onClick={openAddNote} />
                    </div>
                    <div className="main-container">
                        <div className="headline">Notes</div>
                        <div className="cards-container">
                            {
                                notes.map((Data, index) => (
                                    <div className="card" key={index}>
                                        <h2 className="">{Data?.title}</h2>
                                        <p className="">{Data?.description}</p>
                                        <div className="card-edit-icon" onClick={() => openUpdateNote(Data)}><LuPencil /></div>
                                        <div className="card-edit-icon drop" onClick={() => handleDelete(Data?.id)}><MdDelete /></div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            updateDialogBox == true && (
                                <div className="dialog-container">
                                    <div className="dialog-box">
                                        <div className="x-mark" onClick={openUpdateNote}>
                                            <LuX />
                                        </div>
                                        <div className="dialog-main">
                                            <input type="text" placeholder='Title' value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
                                            <textarea name="" id="" className="dialog-input" placeholder='Description' value={updateDesc} onChange={(e) => setUpdateDesc(e.target.value)}></textarea>
                                            <div className="dialog-btn-container">
                                                <button onClick={() => handleUpdateNote(selectedID)}>Send <IoSend /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            addDialogBox == true && (
                                <div className="dialog-container">
                                    <div className="dialog-box add-note">
                                        <div className="x-mark" onClick={openAddNote}>
                                            <LuX />
                                        </div>
                                        <div className="dialog-main">
                                            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                            <textarea name="" id="" className="dialog-input" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                            <div className="dialog-btn-container">
                                                <button onClick={handleAddNote}>Send <IoSend /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home