import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICardEventoProps } from './ICardEventoProps';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { autobind } from '@uifabric/utilities';

export interface ICardEventoState {
    showPanel: boolean;
}

export default class CardEvento extends React.Component<ICardEventoProps, ICardEventoState> {
    constructor(){
        super();

        this.state = {
            showPanel: false
        }

    }

    componentDidMount(){
        
    }

    public render(): React.ReactElement<ICardEventoProps> {
        return (
            <div>
                <div>
                    <a>
                        <h2>{this.props.title}</h2>
                        <p>{this.props.date.toLocaleDateString()}</p>
                        <DefaultButton
                            text='Ver detalhes'
                            onClick={ this._showPanel }
                        />
                    </a>
                </div>
            
                <Panel
                    isOpen={ this.state.showPanel }
                    isLightDismiss={ true }
                    headerText={ this.props.title }
                    onDismiss={ this._hidePanel }>

                    <div>
                        <strong>{ this.props.date.toLocaleString() }</strong>
                        <p>{ this.props.description }</p>
                    </div>
                </Panel>
            </div>
        )
    }

    @autobind
    private _showPanel(): void {
        this.setState({ showPanel: true });
    }

    @autobind
    private _hidePanel(): void {
        this.setState({ showPanel: false });
    }
}