// Create a record with initializeValues, body level fields, line level fields
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
createNSRecord('salesorder', bodyLevelFields, lineItems, initializeValues);