# Use the sample_training database

# Project the company name and year founded and find by the criteria below:
1.  All companies founded in the year 2006,
```
db.companies.find({
    founded_year: 2006
}, {
    _id: 0,
    name: 1,
    founded_year: 1
}).pretty()
```
2.  All companies founded after the year 2000
```
db.companies.find({
    founded_year: {
        $gt: 2000
    }
},{
    _id: 0,
    name: 1,
    founded_year: 1
}).pretty()
```
3.  All companies founded between the year 1900 and 2010
```
db.companies.find({
    founded_year: {
        $gte: 1900,
        $lte: 2010
    }
}, {
    _id: 0,
    name: 1,
    founded_year: 1
}).pretty()
```

# Project the company name, the valuation amount and the valuation currency of its IPO, and find by the criteria below
1. All companies with valuation amount higher than 100 million
```
db.companies.find({
    'ipo.valuation_amount': {
        $gt: 100000000
    }
}, {
    _id: 0,
    name: 1,
    'ipo.valuation_amount': 1,
    'ipo.valuation_currency_code': 1
}).pretty()
```
2. All companies with valuation amount higher than 100 million and with the currency being 'USD'
```
db.companies.find({
    'ipo.valuation_amount': {
        $gt: 100000000
    }, 
    'ipo.valuation_currency_code': {
        $in: ['USD']
    }
},{
    _id: 0,
    name: 1,
    'ipo.valuation_amount': 1,
    'ipo.valuation_currency_code': 1
}).pretty()
```

# Use the inspections collection from the sample_training database for the questions below
1. Find all businesses which has violations issued
```
db.inspections.find({
    result: 'Violation Issued'
}, {
    business_name: 1,
    result: 1
}).pretty()
```
2. Find all business which has violations, and are in the city of New York.
```
db.inspections.find({
    result: 'Violation Issued',
    'address.city': 'NEW YORK'
}, {
    business_name: 1,
    result: 1,
    'address.city': 1
}).pretty()
```
3. Count how many businesses there in the city of New York
```
db.inspections.find({
    'address.city': 'NEW YORK'
}, {}).count()
```
4. Count how many businesses there are in the city of Ridgewood and does not have violations (hint: google for "not equal" in Mongo)
```
db.inspections.find({
    'address.city': 'RIDGEWOOD',
    result: {
        $ne: 'Violation Issued'
    }
}, {}).count()
```

# Use the accounts document from the sample_analytics database and answer the following questions:
1. Find all accounts that have the InvestmentStock product
```
db.accounts.find({
    products: {
        $in: ['InvestmentStock']
    }
}, {
    account_id: 1,
    products: 1
}).pretty()
```
2. Find all accounts that have both the Commodity and InvestmentStock product
```
db.accounts.find({
    products: {
        $all: ['InvestmentStock', 'Commodity']
    }
}, {
    account_id: 1,
    products: 1
}).pretty()
```
3. Find all accounts that have either Commodity OR CurrencyService product
```
db.accounts.find({
    products: {
        $in: ['CurrencyService', 'Commodity']
    }
}, {
    account_id: 1,
    products: 1
}).pretty()
```
4. Find all accounts that does not have CurrencyService product
```
db.accounts.find({
    products: {
        $nin: ['CurrencyService']
    }
}, {
    account_id: 1,
    products: 1
}).pretty()
```
5. Find all products have a limit of more than 1000, and offer both InvestmentStock and InvestmentFund products
```
db.accounts.find({
    products: {
        $all: ['InvestmentStock', 'InvestmentFund']
    },
    limit: {
        $gt: 1000
    }
}, {
    account_id: 1,
    products: 1,
    limit: 1
}).pretty()
```
