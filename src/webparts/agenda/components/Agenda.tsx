import * as React from 'react';
import { IAgendaProps } from './IAgendaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CardEvento from './CardEvento';

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
      );
    }
    else{
      return (
        <div>
          <ul>
            {
              this.state.events.map(item => {
              return (
                <CardEvento
                  id={1}
                  date={new Date()}
                  title={item.Title}
                  description={item.Description}
                  />
                );
              })
            }
          </ul>
        </div>
      );
    }
    
  }

  public getEvents(){
    pnp.sp.web.lists.getByTitle(this.props.list).items.top(this.props.quantity).get()
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
