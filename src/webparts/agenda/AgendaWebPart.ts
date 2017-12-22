import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'AgendaWebPartStrings';
import Agenda from './components/Agenda';
import { IAgendaProps } from './components/IAgendaProps';

export interface IAgendaWebPartProps {
  quantity: number;
  list: string;
}

export default class AgendaWebPart extends BaseClientSideWebPart<IAgendaWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAgendaProps > = React.createElement(
      Agenda,
      {
        quantity: this.properties.quantity,
        list: this.properties.list
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('list', {
                  label: 'Titulo da lista'
                }),
                PropertyPaneSlider('quantity', {
                  label: 'Quantidade',
                  min:1,
                  max: 50,
                  value: 5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
