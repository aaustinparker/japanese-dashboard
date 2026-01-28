

import { config, Service } from './config';


function getServiceUrl(service: Service): string {
  return config[service].baseUrl;
}

function getHeadersFor(service: Service): HeadersInit {
  switch(service) {
    case 'wanikani':
      return {
        'Authorization': `Bearer ${config[service].apiKey}`,
        'Wanikani-Revision': `${config[service].apiVersion}`,
        'Content-Type': 'application/json; charset=utf-8',
      };
    case 'bunpro': return {}
    case 'jisho': return {}
  }

}

export async function fetchExternal(service: Service, targetUrl: string): Promise<any> {
  const serviceUrl = getServiceUrl(service);
  const response = await fetch(`${serviceUrl}/${targetUrl}`,
    {  headers: getHeadersFor(service) }
  )

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${service} API Error: ${errorText}`);
  }
  
  return response.json();
}