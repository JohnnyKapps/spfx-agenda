import * as React from 'react';
import { IAgendaProps } from './IAgendaProps';
import { escape } from '@microsoft/sp-lodash-subset';

import pnp from 'sp-pnp-js';

export interface IAgendaState {
  events?: any[],
  loaded: boolean
}

export default class Agenda extends React.Component<IAgendaProps, IAgendaState> {
  constructor(){
    super();

    this.state = { 
      events: [],
      loaded: false
    };
  }

  componentDidMount(){
    this.getEvents();
  }

  public render(): React.ReactElement<IAgendaProps> {

    if(!this.state.loaded){
      return(
        <div>
          <h1>Carregando items...</h1>
        </div>
      )
    }
    else{
      return (
        <div>
          <h1>{this.state.events.length}</h1>
          <ul>
            {
              this.state.events.map(item => {
                return <div>
                    <a>
                      <h2>{item.Title}</h2>
                      <p>em {item.Location}</p>
                    </a>
                  </div>;
              })
            }
          </ul>
        </div>
      );
    }
    
  }

  public getEvents(){
    pnp.sp.web.lists.getByTitle('Agenda').items.top(this.props.quantity).get()
    .then((results) => {
      console.log(results);
      this.setState({
        events: results,
        loaded: true
      });
    })
    .catch(error => {
      console.error(error);
    })
  }
}
