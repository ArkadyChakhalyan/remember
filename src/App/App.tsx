import React, { useState } from 'react';
import { signIn, signUp } from "../servesis/auth";

export const App = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <input value={login} onChange={e => setLogin(e.target.value)}/>
            <input value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={() => signUp(login, password)}>sign up</button>
            <button onClick={() => signIn(login, password)}>sign in</button>
        </div>
    );
}
