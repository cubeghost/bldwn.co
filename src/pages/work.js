import React from 'react';
import Link from 'gatsby-link';

import Work from '../components/Work';

import { extractQuery } from '../utils';

/*
░█  ░█  ░███  ░████  ░█  ░█
░█  ░█ ░█  ░█ ░█  ░█ ░█  ░█
░█  ░█ ░█  ░█ ░█░██  ░█░██
░█░█░█ ░█  ░█ ░█  ░█ ░█  ░█
 ░█░█   ░███  ░█  ░█ ░█  ░█
*/
const ansi = `░█  ░█  ░███  ░████  ░█  ░█
░█  ░█ ░█  ░█ ░█  ░█ ░█  ░█
░█  ░█ ░█  ░█ ░█░██  ░█░██
░█░█░█ ░█  ░█ ░█  ░█ ░█  ░█
 ░█░█   ░███  ░█  ░█ ░█  ░█
`;

const WorkPage = (props) => {
  const work = extractQuery(props.data, 'allWorkJson');

  return (
    <div className="page page-work">
      <pre aria-label="work">{ansi}</pre>
      <div>
        {work.reverse().map((thing) => (
          <Work
            key={thing.id}
            {...thing}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkPage;

export const WorkQuery = graphql`
  query Work {
    allWorkJson {
      edges {
        node {
          id
          url
          title
          thumbnail
          description
        }
      }
    }
  }
`;
