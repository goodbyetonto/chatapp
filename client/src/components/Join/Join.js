import React, { useState } from 'react'; 

// Used for linking to /chat pathway
import { Link } from 'react-router-dom'; 

import './Join.css'; 

export default function Join (){
    const [device, setDevice] = useState(''); 
    const [table, setTable] = useState(''); 

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                { /*Create Input div for accessing table id and anonymous device id */ }
                <div><input placeholder="anonymous device" className="joinInput" type="text" onChange={(event) => setDevice(event.target.value)} /></div>
                <div><input placeholder="table id" className="joinInput mt-20" type="text" onChange={(event) => setTable(event.target.value)} /></div>
                { /*If no device or table are input, then app will not proceed to chat view */ }
                { /*Will attach device id and table id to url */ }
                <Link onClick={e => (!device || !table) ? e.preventDefault() : null} to={`/chat?device=${device}&table=${table}`}>
                    <button className="button mt-20" type="submit">Join Table</button>
                </Link>
            </div>
        </div>
    )
}; 

