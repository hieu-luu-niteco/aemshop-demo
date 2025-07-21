import { createOptimizedPicture } from '../../scripts/aem.js';  
import { getConfigValue,  getHeaders } from '@dropins/tools/lib/aem/configs.js';

export default async function decorate(block) {
    // Get the catalog service endpoint
    const endpoint = await getConfigValue('commerce-endpoint');
    // get the catalog service required headers
    const headers = await getHeaders('cs');
  
    const response = await fetch(endpoint, { headers });
  
    // do stuff with response
    console.log("This is from test-block.js");
    console.log(response);
  }
