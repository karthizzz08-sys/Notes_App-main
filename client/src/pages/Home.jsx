import React, { useState } from 'react'
import "./../index.css"
import { LuSearch, LuPlus, LuPencil, LuX } from "react-icons/lu";

const Home = () => {
    const [updateDialogBox, setUpdateDialogBox] = useState(false);

    function openUpdateNote() {
        setUpdateDialogBox(!updateDialogBox)
    }


    const [border,borderclose] = useState(false);

    function bordercolor(){
        borderclose(!border)
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
                        <LuPlus className='plus-icon' />
                    </div>
                    <div className="main-container">
                        <div className="headline">Notes</div>
                        <div className="cards-container">
                            <div className="card"><textarea type="text"  className='input-box' onClick={bordercolor}></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                            <div className="card"><textarea type="text"  className='input-box'></textarea><div className="card-edit-icon" onClick={openUpdateNote}><LuPencil /></div></div>
                        </div>
                        {
                            updateDialogBox == true && (
                                <div className="dialog-container">
                                    <div className="dialog-box">
                                        <div className="x-mark" onClick={openUpdateNote}>
                                            <LuX />
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