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

    const {tableHeader, fnameKey,lnameKey, firstName, lastName } = placeholders.translations;
    console.log("tableHeader",tableHeader); 
    console.log("fnameKey",fnameKey);
    console.log("lnameKey",lnameKey);
    console.log("firstName",firstName);
    console.log("lastName",lastName);

    let authorRow=document.createElement("tr");
    let authorCol=document.createElement("th"); authorCol.appendChild(document.createTextNode(tableHeader));
    authorCol.colSpan=2;
    authorRow.append(authorCol);
    table.append(authorRow);

    let firstNameRow=document.createElement("tr");
    let firstNameCol1=document.createElement("td"); authorCol.appendChild(document.createTextNode(fnameKey));
    let firstNameCol2=document.createElement("td"); authorCol.appendChild(document.createTextNode(firstName));    
    firstNameRow.append(firstNameCol1);
    firstNameRow.append(firstNameCol2);
    table.append(firstNameRow);

    let lastNameRow=document.createElement("tr");
    let lastNameCol1=document.createElement("td"); authorCol.appendChild(document.createTextNode(lnameKey));
    let lastNameCol2=document.createElement("td"); authorCol.appendChild(document.createTextNode(lastName));    
    firstNameRow.append(lastNameCol1);
    firstNameRow.append(lastNameCol2);
    table.append(lastNameRow);
    
    return table;
}



export default async function decorate(block) {    
    const table = await createTableWithPlaceholder();
    block.replaceChildren(table);    
}