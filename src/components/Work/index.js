import React from 'react';
import Markdown from 'react-markdown';

import './work.scss';

const Work = ({
  id,
  type,
  url,
  thumbnail,
  title,
  description
}) => {

  // TODO url,

  return (<div className="work">
    {thumbnail && <img className="work-thumbnail" src={thumbnail} />}

    <div className="work-body">
      {title && <Markdown className="work-title" source={title} />}
      {description && <Markdown className="work-description" source={description} />}
    </div>
  </div>);
};

export default Work;
