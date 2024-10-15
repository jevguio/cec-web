import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from './index.jsx';

function App() {
    return (
        <>
        <Main></Main>
        </>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
