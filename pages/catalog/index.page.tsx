import React, {useState} from 'react';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner';
import NavBar from '../../components/Navigation/NavBar';
import CatalogAndAggregation from '../../components/CatalogAndAggreg/CatalogAndAggregation';
import { HydratedContentItem } from '@thoughtindustries/content';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Content } from '@thoughtindustries/content/src/graphql/global-types';

export { Page };
export { documentProps };

const documentProps = {
  title: 'Catalog Page',
  description: 'The catalog page'
};

function Page() {

  const catalog_query = gql`
    query CatalogContent($page: Int!) {
      CatalogContent(page: $page) {
        contentItems {
          title
          description
          asset
          slug
        }
      }
    }`

  const { data, error } = useQuery(catalog_query, {
    variables: { page: 1 }
  });

  let content = <h1>Loading...</h1>

  if (data) { 
    content = data.CatalogContent.contentItems.map((contentItem: Content, i: number) => {
      return <div 
        className='w-96 h-96 shadow-lg rounded-lg m-9'
        key={i}>
        <img src={contentItem.asset} alt={contentItem.title} className="w-96 h-60" />
        <h1 className='font-bold text-base'>{contentItem.title}</h1>
        <h1>{contentItem.description}</h1>
        <h1
          className='text-blue-500 hover:cursor-pointer text-right mr-5 underline'
          onClick={() => {
            console.log('clicked')
            window.location.href = `/courses/${contentItem.slug}`
          }}
          >
          View Details</h1>
      </div>
    })
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <div className="font-primary">
        <NavBar />
        <div className='flex flex-row flex-wrap'>
          {content}
        </div>
        <Footer />
      </div>
    </>
  );
}
