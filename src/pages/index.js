import React from 'react';
import Link from 'gatsby-link';

/*
     ░███   ░███  ░███
    ░█  ░█ ░█    ░█  ░█
    ░█  ░█ ░████ ░█  ░█
    ░█  ░█ ░█    ░█  ░█
░█  ░█  ░█ ░█     ░███
*/
const nfo = `     ░███   ░███  ░███
    ░█  ░█ ░█    ░█  ░█
    ░█  ░█ ░████ ░█  ░█
    ░█  ░█ ░█    ░█  ░█
░█  ░█  ░█ ░█     ░███
`;

const IndexPage = (props) => {
  return (
    <div className="page page-nfo">
      <pre aria-label=".nfo">{nfo}</pre>
      <p>
        alex baldwin is a web developer, aesthetic curator, glitch artist,
        unicode hype machine, radical leftist, code wizard, and lvl 3000 cyberwitch.
        ⌘
      </p>
      <p>they currently work at <a href="https://capsulecares.com/">capsule</a>.</p>
    </div>
  );
};

export default IndexPage;
