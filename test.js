var fs = require('fs'), a = require('avro');

var schema = JSON.parse(fs.readFileSync('search', 'utf8'));

out = a.encode(schema, {"query":"search"});

console.log(a.decode(schema, out));

var string_schema = JSON.parse('{"type": "string"}');

console.log(a.validate(string_schema, "search"));

var enum_schema = JSON.parse('{ "type" : "enum", "name" : "TestEnum", "symbols" : [ "A", "B", "C" ]}');

console.log(a.validate(enum_schema, "A"));

var array_schema = JSON.parse('{"type" : "array", "items" : "string"}');

console.log(a.validate(array_schema, ["val"]));

var map_schema = JSON.parse('{"type" : "map", "values" : "string"}');

var map = {"abc": "def"};

console.log(a.validate(map_schema, map));

console.log(a.decode(map_schema, a.encode(map_schema, map)));

var map_schema = JSON.parse('{"type" : "map", "values" : "string"}');

var map = new Array();
map[99] = 99;

console.log(a.validate(map_schema, map));

console.log(a.decode(map_schema, a.encode(map_schema, map)));

var union_schema = JSON.parse('[ "int", "string" ]');

console.log(a.validate(union_schema, 1));

var record_schema = JSON.parse('{"type" : "record", "name" : "ShippingServiceOption", "fields" : [ { "name" : "field1", "type" : "int" }, { "name" : "field2", "type" : "string" }]}');

var record = new Array();
record["field1"] = 1;
record["field2"] = "abc";

console.log(a.validate(record_schema, record));

out = a.encode(union_schema, 1);
console.log(a.decode(union_schema, out));

out = a.encode(union_schema, "abc");
console.log(a.decode(union_schema, out));

var profile_created_schema = JSON.parse(fs.readFileSync('ProfileCreate.avsc', 'utf8'));

var returnPolicy = {"description": "return policy 1"};

var shipping = {
    "shippingLocaleServices":
    [ {"rateType": "FLAT",
       "localeType": "DOMESTIC",
       "applyPromotionalShippingRule": true,
       "shippingServiceOptions": [{
	   "sellerPriority": 1,
	   "serviceName": "service",
	   "cost": {"amount": 5.0, "code": "USD"},
       }]
      }]};

var profile = {
    "name": "name",
    "xAccountId": "id",
    "returnPolicy": returnPolicy,
    "shipping": shipping
};

var profile_create = new Array();
profile_create = {
    "p": profile
};

out = a.encode(profile_created_schema, profile_create);
val = a.decode(profile_created_schema, out);

console.log(JSON.stringify(val));
console.log(val.p.shipping.shippingLocaleServices[0].rateType);
console.log(val.p.shipping.shippingLocaleServices[0].shippingServiceOptions[0].serviceName);
console.log(val.p.shipping.shippingLocaleServices[0].shippingServiceOptions[0].cost);

var inventory_schema = JSON.parse(fs.readFileSync('Inventory.avsc', 'utf8'));

var inventory = {
    "items": [ {"sku":"123", "title":"my title", "currentPrice": "1.00", "url": "http://x.com", "dealOfTheDay": "true"},
	     {"sku":"456", "title":"my title 2", "currentPrice": "2.00", "url": "http://x.com", "dealOfTheDay": "false"}]
};

out = a.encode(inventory_schema, inventory);
val = a.decode(inventory_schema, out);
console.log(JSON.stringify(val));