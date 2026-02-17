

import { getConfig, Service } from './config';


function getServiceUrl(service: Service): string {
  const config = getConfig();
  return config[service].baseUrl;
}

function getHeadersFor(service: Service): HeadersInit {
  const config = getConfig();
  switch(service) {
    case 'wanikani': 
     return {
        'Authorization': `Bearer ${config[service].apiKey}`,
        'Wanikani-Revision': `${config[service].apiVersion}`,
        'Content-Type': 'application/json; charset=utf-8',
      };
    case 'bunpro':
     return {
        'Authorization': `Token token=${config[service].apiKey}`,
        'Content-Type': 'application/json; charset=utf-8',
      };
    case 'translate':
     return {
        'Content-Type': 'application/json; charset=utf-8',
     }
  }

}

export async function fetchExternal(service: Service, targetUrl: string, requestBody?: any): Promise<any> {
  const serviceUrl = getServiceUrl(service);
  const response = await fetch(`${serviceUrl}/${targetUrl}`,
    {  
      headers: getHeadersFor(service), 
      method: requestBody ? 'POST' : 'GET',
      body: requestBody ? JSON.stringify(requestBody) : undefined, 
    }
  )

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${service} API Error: ${errorText}`);
  }
  
  return response.json();
}