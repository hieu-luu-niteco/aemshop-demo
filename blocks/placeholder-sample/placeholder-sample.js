import { getMetadata } from '../../scripts/aem.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';

async function createTableWithPlaceholder(){
    const table = document.createElement('table');

    const locale = getMetadata("locale");
    console.log("locale",locale);
    if (locale == 'en') {        
        const placeholders = await fetchPlaceholders("translations.json");
    } else {
        const translaplaceholderstions = await fetchPlaceholders(locale + "/translations.json");
    }
    console.log("placeholders",placeholders);
    const {tableHeader, fnameKey,lnameKey, firstName, lastName } = placeholders._merged;
    console.log("tableHeader",tableHeader); 
    console.log("fnameKey",fnameKey);
    console.log("lnameKey",lnameKey);
    console.log("firstName",firstName);
    console.log("lastName",lastName);

    let headerRow=document.createElement("tr");
    let authorCol=document.createElement("th"); authorCol.appendChild(document.createTextNode(tableHeader));
    //authorCol.colSpan=2;
    headerRow.append(authorCol);
    let firstNameCol1=document.createElement("th"); firstNameCol1.appendChild(document.createTextNode(fnameKey));
    headerRow.append(firstNameCol1);
    let lastNameCol1=document.createElement("th"); lastNameCol1.appendChild(document.createTextNode(lnameKey));
    headerRow.append(lastNameCol1);
    
    table.append(headerRow);    

    // let row1=document.createElement("tr");
    // let authorCol1=document.createElement("td"); authorCol1.appendChild(document.createTextNode(firstName));
    // row1.append(authorCol1);
    // let firstNameCol2=document.createElement("td"); firstNameCol2.appendChild(document.createTextNode(firstName));
    // row1.append(firstNameCol2);
    // table.append(row1);

    // // let lastNameRow=document.createElement("tr");
    
    // // let lastNameCol2=document.createElement("td"); authorCol.appendChild(document.createTextNode(lastName));    
    // // firstNameRow.append(lastNameCol1);
    // // firstNameRow.append(lastNameCol2);
    // table.append(row1);
    
    return table;
}



export default async function decorate(block) {    
    const table = await createTableWithPlaceholder();
    block.replaceChildren(table);    
}