import React from 'react';
import '../../style.css';

export default ({ message }) =>
  <aside>
    {message}
    <style jsx>{`
      aside {
        padding: 1em;
        font-size: 14px;
        color: white;
        border-radius: 10px;
        padding-bottom: 10px;
        align-text: center;
        background-color: hsl(348, 86%, 43%);
      }
    `}</style>
  </aside>;