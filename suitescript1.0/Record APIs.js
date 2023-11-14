//---------------------- Create a record with initializeValues, body level fields, line level fields
bodyLevelFields = {
    location: "14",
    orderstatus: "B",
    memo: "this is sample memo from console"
}
initializeValues = {
    entity: "1812"
}
lineItems = {
    item: [
        { item: 507, quantity: 3, location: 14, amount: 99.00 },
        { item: 507, quantity: 3, location: 14, amount: 66.00 }
    ]
}
function createNSRecord(type, bodyLevelFields, lineItems, initializeValues) {
    // nlapiCreateRecord(type, initializeValues)
    var record = nlapiCreateRecord(type, initializeValues);
    //set bodylevel fields for the given record type
    for (let field in bodyLevelFields) {
        record.setFieldValue(field, bodyLevelFields[field]); //key , value
    }

    //set line level item

    //set items on line level for given record type
    var sublistType = 'item'
    if (lineItems.hasOwnProperty(sublistType)) {
        // console.log(sublistType)
        for (let individualItem of lineItems[sublistType]) {
            // console.log(individualItem)
            record.selectNewLineItem(sublistType);
            for (let itemField in individualItem) {
                // console.log(itemField)
                record.setCurrentLineItemValue(sublistType, itemField, individualItem[itemField]);
            }
            record.commitLineItem(sublistType);
        }
    }
    // saved the record in NetSuite and get the internal id of created record
    id = nlapiSubmitRecord(record, true);
    return id;
}
// createNSRecord('salesorder', bodyLevelFields, lineItems, initializeValues);


//-------------------------------------Load an Exisiting Record
nlapiLoadRecord(type, id, initializeValues)
var record = nlapiLoadRecord('invoice', 51729);


//-------------------------------------Get Body Level Fields from  Exisiting Record

// getFieldValues(fldnam) - return the value of given fieldid
record.getFieldValue('email')

// record.getFieldText(fldnam) - return the value on the UI 
record.getFieldText('location')


//-------------------------------------Get Line Level Fields from  Exisiting Record

//recordObject.getLineItemText(sublisttype, fieldid, linenumber) --return value on the UI
record.getLineItemText('item', 'price', 1)

//recordObject.getLineItemValue(sublisttype, fieldid, linenumber) --return internal id or value depending on the field
//for example - fieldid = item will return internal id, while amount will give the amount value of given line item
record.getLineItemValue('item', 'amount', 1)

record.getLineItemCount('item')


//-------------------------------------Delete Exisiting Record from NS - no undo
nlapiDeleteRecord(type, id, initializeValues)
var id  = nlapiDeleteRecord('salesorder', '51729') //return an ID of deleted record type, it permantely deletes it from netsuite


// --------------------------------------------Get Record Id, Type, Current logged in role,
nlapiGetRecordId() // --get current record id in the given context
nlapiGetRecordType() //-- get current record type in the given context
nlapiGetRole() // to get the current logged in role internal id



