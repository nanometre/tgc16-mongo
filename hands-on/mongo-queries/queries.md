# Mongo Lab (Powerpoint Doc)
## Use the sample_training database

## Project the company name and year founded and find by the criteria below:
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

## Project the company name, the valuation amount and the valuation currency of its IPO, and find by the criteria below
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

## Use the inspections collection from the sample_training database for the questions below
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

## Use the accounts document from the sample_analytics database and answer the following questions:
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

# Mongo Lab Hands On (Word Doc)
## USE THE sample_resturants DATABASE FOR THE QUESTIONS BELOW
1.	Find all restaurants that specialize in hamburgers cuisine 
```
db.restaurants.find({
    cuisine: 'Hamburgers'
},{
    name: 1,
    cuisine: 1
}).pretty()
```
2.	Find all restaurants that specialize in American cuisine and are in the Bronx borough.
```
db.restaurants.find({
    cuisine: 'American',
    borough: 'Bronx'
},{
    name: 1,
    cuisine: 1,
    borough: 1
}).pretty()
```
3.	Find all restaurants that are located at the street "Stillwell Avenue"
```
db.restaurants.find({
    'address.street': 'Stillwell Avenue'
},{
    name: 1,
    'address.street': 1
}).pretty()
```

## USE THE sample_mflix DATABASE FOR THE QUESTIONS BELOW
1.	From the movies collection
    a.	Count how many movies there are
    ```
    db.movies.find().count()
    ```
    b.	Count how many movies there are released before the year 2000
    ```
    db.movies.find({
        year: {
            $lt: 2000
        }
    }, {}).count()
    ```
    c.	Show the first ten titles of movies produced in the USA
    ```
    db.movies.find({
        countries: {
            $in: ['USA']
        }
    },{
        title: 1,
        countries: 1
    }).pretty().limit(10)
    ```
    d.	Show the first ten titles of movies not produced in the USA
    ```
    db.movies.find({
        countries: {
            $nin: ['USA']
        }
    },{
        title: 1,
        countries: 1
    }).pretty().limit(10)
    ```
    Alternative
    ```
    db.movies.find({
    'countries':{
        '$not': [
            '$in:['USA]
            ]
        }
    }).pretty().limit(10)
    ```
    e.	Show movies that have at least 3 wins in the awards object
    ```
    db.movies.find({
        'awards.wins': {
            $gte: 3
        }
    }, {
        title: 1,
        'awards.wins': 1
    })
    ```
    f.	Show movies that have at least 3 nominations in the awards object
    ```
    db.movies.find({
        'awards.nominations': {
            $gte: 3
        }
    }, {
        title: 1,
        'awards.nominations': 1
    })
    ```
    g.	Show movies that cast Tom Cruise
    ```
    db.movies.find({
        cast: {
            $in: ['Tom Cruise']
        }
    }, {
        title: 1,
        'cast.$': 1
    })
    ```
    h.	Show movies that are directed by Charles Chaplin
    ```
    db.movies.find({
        directors: {
            $in: ['Charles Chaplin']
        }
    }, {
        title: 1,
        directors: 1
    })
    ```

## USE THE sample_weatherdata DATABASE FOR THE QUESTIONS BELOW
1.	Count how many records there are of wind speed with rate higher than 5
```
db.data.find({
    'wind.speed.rate': {
        $gt: 5 
    }
}, {
    'wind.speed.rate': 1
}).count()
```
2.	Count how many records there are of wind speed with rate higher than 5 but is not 999.9
```
db.data.find({
    'wind.speed.rate': {
        $gt: 5,
        $ne: 999.9
    }
}, {
    'wind.speed.rate': 1
}).count()
```

## USE THE sample_supplies DATABASE FOR THE QUESTIONS BELOW
1.	Count how many sales includes laptop
```
db.sales.find({
    items: {
        $elemMatch: {
            name: 'laptop'
        }
    }
}, {
    'items.$': 1
}).count()
```
2.	Count how many sales includes laptop and is made at Denver
```
db.sales.find({
    items: {
        $elemMatch: {
            name: 'laptop'
        }
    },
    storeLocation: 'Denver'
}, {
    storeLocation: 1,
    'items.$': 1
}).pretty()
```
3.	Show the sales that are made at Denver OR Seattle.
```
db.sales.find({
    $or:[
        {
            storeLocation: 'Denver'
        },
        {
            storeLocation: 'Seattle'
        }
    ]
}, {
    storeLocation: 1,
    'items': 1
}).pretty()
```
4.	Show the store location where the user with the email address "beecho@wic.be" has purchased at
```
db.sales.find({
    'customer.email': "beecho@wic.be"
}, {
    'customer.email': 1,
    storeLocation: 1
}).pretty()
```
5.	Show the store location of all sales where coupon is used and the customer's satisfaction is 4 or above
```
db.sales.find({
    couponUsed: true,
    'customer.satisfaction': {
        $gte: 4
    }
}, {
    couponUsed: 1,
    storeLocation: 1
}).pretty()
```
6.	Show the store location and items sold for sales where more than 4 laptops are sold
```
db.sales.find({
    items: {
        $elemMatch: {
            name: 'laptop',
            quantity: {
                $gt: 4
            }
        },
    }
},{
    storeLocation: 1,
    'items.$': 1
})
```