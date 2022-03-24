import React, { useState } from 'react';
import { useGoogleAuth } from '../components/GoogleAuthProvider';


function ProfilePersonolize( { setShowProfileSettings } ) {
    const { googleUser } = useGoogleAuth();
    const tokenID = googleUser.tokenId;

    const [name, setName] = useState('');
    const [bioInfo, setBioInfo] = useState('');
    const [webLink, setWebLink] = useState('');

    const addPersonalInfo = () => {
        setShowProfileSettings(false);
        fetch(`/api/profile-info/post`, {
            method: 'post',
            body: JSON.stringify({name, bioInfo, webLink, tokenID}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    
    return (
        <div id="ProfilePersonolizeComponent">
            <div id="exit-container">
                <div className="exit-icon icon-hover" onClick={() => setShowProfileSettings(false)}></div>
            </div>
            <div className="edit-profile">Edit Profile</div>
            <label>
                User Name:
                <input className="input-style" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            </label>
            <label>
                Bio: 
                {/* <input className="input-style" type="text" value={bioInfo} onChange={(event) => setBioInfo(event.target.value)}/> */}
                <textarea className="input-style" type="text" rows="4" cols="50" value={bioInfo} onChange={(event) => setBioInfo(event.target.value)}/>
            </label>
            <label>
                Personal Website: 
                <input className="input-style" type="text" value={webLink} onChange={(event) => setWebLink(event.target.value)}/>
            </label>
            <div id="input-profile-info-button" onClick={() => addPersonalInfo()}> Submit </div>
        </div>
    )
}

export default ProfilePersonolize;