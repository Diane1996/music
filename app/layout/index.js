import React from 'react';
import css from './index.less';
import resources from '../resources/musicResources';

import Play from './play/index';

export default class Layout extends React.Component {
    constructor(){
        super();
    }

    componentDidMount() {
        console.log(resources);
    }

    render(){
        return (
          <div className={css.layout}>
              <Play/>
          </div>
        );
    };
}