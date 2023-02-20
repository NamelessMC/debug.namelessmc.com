import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// @ts-expect-error Errors in the next line should be ignored
import hljs from '../node_modules/highlight.js/lib/core';
// @ts-expect-error Errors in the next line should be ignored
import log from '../node_modules/highlight.js/lib/languages/accesslog';

import App from './App';
import './i18n';

hljs.registerLanguage('log', log);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
