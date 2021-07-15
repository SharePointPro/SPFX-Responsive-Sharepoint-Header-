import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
  PlaceholderProvider
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderAndFooterExtensionApplicationCustomizerStrings';
import { GlobalHeader } from './components/GlobalHeader';

const LOG_SOURCE: string = 'HeaderAndFooterExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderAndFooterExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderAndFooterExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderAndFooterExtensionApplicationCustomizerProperties> {
  private topPlaceHolder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    // Handling the top placeholder
    if (!this.topPlaceHolder) {
      this.topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this.topPlaceHolder) {
        console.error("The expected placeholder (Top) was not found.");
        return Promise.resolve();
      }

      const element: React.ReactElement = React.createElement(
        GlobalHeader
      );
      ReactDom.render(element, this.topPlaceHolder.domElement);
    }


    return Promise.resolve();
  }


  private _onDispose(): void {
  }
}
