import React from 'react';
import { AppConfig } from '../../../constants/App.config';
import EsPageBreadcrumb from './EsBreadcrumb';
import EsPageTitle from './EsPageTitle';
import EsPageButtons from './EsPageButtons';
import EsPageSearch from './EsPageSearch';

const PageInfo = (props) => {

  const breadcrumbs = [AppConfig.home]; // Default 'Home'.
  let pageButtons = [];

  const config = AppConfig[props.pageKey];

  /** Function to add a Action button on the right side of the page. */
  const addPageButtons = (actionItem) => {
    let button = AppConfig[actionItem.page];
    let url = button.url
    if (actionItem.getParams) {
      const params = props.getUrlParams
      url = `${url}/${params}`;
    }
    pageButtons.push({
      title: button.title,
      url,
      label: actionItem.label,
      icon: actionItem.icon,
    });
  }

  /** Function to add a breadcrumb item. */
  const addBreadcrumbItem = (pageKey, last) => {
    let breadcrumbItem = AppConfig[pageKey];
    if (last) {
      breadcrumbItem = {title: props.moduleName || breadcrumbItem.title};
    }
    breadcrumbs.push(breadcrumbItem);
  }

  if (config.breadcrumbs) {
    config.breadcrumbs.forEach((item) => addBreadcrumbItem(item));
  }

  addBreadcrumbItem(props.pageKey, true); // Last item.

 if (config.actions) {
  config.actions.forEach((actionItem) => addPageButtons(actionItem));
 }

  return (
    <>
      <div className='es-content-page-info-left'>
        <EsPageTitle title={config.title} moduleName={props.moduleName || ''} />
        <EsPageBreadcrumb breadcrumbs={breadcrumbs}/>
      </div>
      <div className='es-content-page-info-right'>
        {config.search && <EsPageSearch title={config.title}/> }
        <EsPageButtons pageButtons={pageButtons}/>
      </div>
    </>
  )
}

export default PageInfo
