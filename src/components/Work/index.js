import React from 'react';
import Markdown from 'react-markdown';

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

    {title && <Markdown className="work-title" source={title} />}
    {description && <Markdown className="work-description" source={description} />}
  </div>);
};

export default Work;
