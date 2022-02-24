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

Example: Find all listing in Brazil that has less than 4 bedrooms
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

# Find by elements in array
```
db.listingsAndReviews.find({
    'amenities':'Oven'
}, {
    'name': 1,
    'amenities': 1
}).pretty()
```

E.g. find all listings that have oven, OR microwave OR stove
$in is to find elements in an array
```
db.listingsAndReviews.find({
    'amenities':{
        '$in': ['Oven', 'Microwave', 'Stove']
    }
}, {
    'name': 1,
    'amenities':1
}).pretty()
```

E.g. $all will only match if everything in array is in amenities
$all is to find elements in an array
```
db.listingsAndReviews.find({
    'amenities':{
        '$all': ['Oven', 'Microwave', 'Stove', 'Dishes and silverware']
    }
}, {
    'name': 1,
    'amenities':1
}).pretty()
```

# Search by ObjectId
Find the document in the movies collection that has the following
ObjectId: 573a1390f29313caabcd4135
```
use sample_mflix;
db.movies.find({
    '_id':ObjectId('573a1390f29313caabcd4135')
}).pretty()
```

# Logical Operators
Back to the `sample_airbnb` database.
e.g. Find all listing in Brazil or Canada:
```
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country': 'Brazil'
        },
        {
            'address.country': 'Canada'
        }
    ]
}, {
    'name': 1,
    'address.country': 1,
}).pretty()
```

e.g. Find all listings in Brazil or Canada. The listings from Brazil must have more than 3 bedrooms.
```
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':"Brazil",
            'bedrooms':{
                '$gt':3
            }
        },
        {
            'address.country':'Canada'
        }
    ]
},{
    'name':1,
    'address.country':1,
    'bedrooms':1
}).pretty()
```

# Find all listing that has been reviewed by Leslie
In other words, we want to shortlist documents by a field in one of their embedded objects.
$elemMatch is to match properties of objects
```
db.listingsAndReviews.find({
    'reviews':{
        '$elemMatch' : {
            'reviewer_name': 'Leslie'
        }
    }
},{
    name: 1,
    'reviews.$': 1
}).pretty()
```

# Match by date
The date in the ISO format: YYYY-MM-DD and we need to wrap it with a function
Find all listing that have been reviewed before 2019
```
db.listingsAndReviews.find({
    first_review: {
        $lte: ISODate('2018-12-31')
    }
}, {
    name: 1,
    first_review: 1
}).pretty()
```

# Find by string pattern (i.e. regular expressions)
Find all the listings where the name includes the word 'spacious'
Note: the `i` for the `$options` means case insensitive comparison
```
db.listingsAndReviews.find({
    name: {
        $regex: 'Spacious', $options: 'i'
    }
},{
    name: 1
}).pretty()
```

# Counting results
Count all the number of listings
```
db.listingsAndReviews.find().count()
```

# We find all listings that have at least 6 amenities
To find if a listing have 6 or more amenities, we'll check if the 6th element of the amneities array exists:
```
db.listingsAndReviews.find({
    'amenities.5' : {
        $exists: true
    }
}, {
    'name':1,
    'amenities':1
}).pretty()
```