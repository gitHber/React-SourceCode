import Element from './react';

let ele = new Element(
  'div', 
  {name: 'likun'}, 
  [new Element('span', {name: 'title'}, ['内容'])]
);
ele.render();