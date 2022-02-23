Show all the databases in your server
```
show databases;
```

To set the active database `sample_airbnb`
```
use sample_airbnb;
```

To know what is the current database
```
db
```

To see all the collections in the current actiee database:
```
show collections
```
# Find documents
Generic syntax:
```
db.<name of collection>.find()
```

Prettify the result:
```
db.listingsAndReviews.find().pretty();
```

# Limit
Limit to a certain number of results
```
db.listingsAndReviews.find().pretty().limit(5);
```

# Projection
Choose which fields to display. We only want to see the name of the listing and the number of beds.

```
db.listingsAndReviews.find({},{
    'name':1,
    'beds':1
}).pretty().limit(5);
```
Note: first argument is the critera to filter by
and if it is an empty object it means we want
all documents.

# Filter by a critera
```
db.listingsAndReviews.find({
    'beds': 2
},{
    'name':1,
    'beds':1
})
```

## Search by multiple criteria (AND)
Find all the listings with 2 bedrooms and 2 beds.
```
db.listingsAndReviews.find({
    'beds':2,
    'bedrooms':2
},{
    'name': 1,
    'beds': 1,
    'bedrooms':1,
    'house_rules':1
}).pretty().limit(5);
```

# Search by keys of nested objects
```
db.listingsAndReviews.find({
    'address.country':'Brazil'
}, {
    'name':1,
    'address.country':1
}).pretty()
```

# Filter by inequality
We have to use special operators for inequality, such as greater than
or lesser than.

Example: Find all listings that have more than or equal to 3 bedrooms

```
db.listingsAndReviews.find({
    'bedrooms':{
        '$gte':3
        }
    }, {
        'name':1,
        'bedrooms':1
    }
).pretty();
```

# Search for all listings that have between 3 and 6 bedrooms.

```
db.listingsAndReviews.find({
    'bedrooms':{
        '$gte':3,
        '$lte':6
    }
},{
    'bedrooms':1,
    'name':1
}).pretty()
```

# Example: Find all listing in Brazil that has less than 4 bedrooms
```
db.listingsAndReviews.find({
    'address.country':'Brazil',
    'bedrooms': {
        '$lte':4
    }
},{
    'address.country':1,
    'name':1,
    'bedrooms':1,
    'beds':1
}).pretty()
```