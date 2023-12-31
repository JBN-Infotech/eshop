import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { Link } from "react-router-dom";

const EsContentPageBreadcrumb = (props) => {

  /** Function to render a breadcrumb items with link. */
  const renderBreadCrumb = (item, index) => (
    <BreadcrumbItem key={index.toString()}>
      <Link to={item.url}>{item.title}</Link>
    </BreadcrumbItem>
  )

  return (
    <div className='es-content-page-breadcrumb'>
      <Breadcrumb>
        {
          props.breadcrumbs.map((item, index) => (
            item.url
              ? (renderBreadCrumb(item, index))
              : <div key={indexedDB.toString()}>{item.title}</div>
          ))
        }
      </Breadcrumb>
    </div>
  )
}

export default EsContentPageBreadcrumb
