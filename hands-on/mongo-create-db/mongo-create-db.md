# HANDS ON
1. Create a new mongodb database with the name fake_school
2. Create a new collection name students
3. Add to the students collection the following documents:

Name: Jane Doe
Age: 13
Subjects: Defense Against the Dark Arts, Charms, History of Magic
Date Enrolled: 13th May 2016

Name: James Verses
Age: 14
Subjects: Transfiguration, Alchemy
Date Enrolled: 15th June 2015

Name: Jonathan Goh
Age: 12
Subjects: Divination, Study of Ancient 

```
db.students.insertOne({
    'name': 'Jane Doe',
    'age': '13',
    'subjects': ['Defense Against the Dark Arts', 'Charms', 'History of Magic'],
    'date_enrolled': ISODate('2016-05-13')
})

db.students.insertMany([
    {
        'name': 'James Verses',
        'age': '14',
        'subjects': ['Transfiguration', 'Alchemy'],
        'date_enrolled': ISODate('2015-06-15')
    },
    {
        'name': 'Jonathan Goh',
        'age': '12',
        'subjects': ['Divination', 'Study of Ancient Runes'],
        'date_enrolled': ISODate('2017-04-16')
    }
])
```

* Increase the age of all the students by 1
```
db.students.updateMany({}, {
    $inc: {
        'age': +1
    }
})
```
* Change the date enrolled of Jonathan Goh to 2018 13th May
```
db.students.updateOne({
    _id: ObjectId("62173209fc9f14e17723af31")
},{
    $set: {
        date_enrolled: '2018-05-13'
    }
})
```
* Change the age of James Verses to 13
```
db.students.updateOne({
    _id: ObjectId("62173209fc9f14e17723af30")
},{
    $set:{
        age: 13
    } 
})
```
* Change the student with the name of "Jane Doe" to "Jane Doe Jr" and her age to 11.
```
db.students.updateOne({
    _id: ObjectId("62173161fc9f14e17723af2f")
}, {
    $set:{
        name: "Jane Doe Jr",
        age: 11
    } 
})
```
* Remove Jonathan Goh from the system
```
db.students.deleteOne({
    _id: ObjectId("62173209fc9f14e17723af31")
})
```

# Add in the following pets:
* Name: Jorden, Age: 15 Breed: Golden Retriever Species: dog 
* Name: Dash Age: 3 Breed: Hamster Species: Hamster
* Name: Carrot Age: 1.5 Breed: Australian Dwarf Species: Rabbit
```
db.animals.insertMany([
    {
        name: 'Jorden',
        age: 15,
        breed: 'Golden Retriever',
        species: 'dog'
    },
    {
        name: 'Dash',
        age: 3,
        breed: 'Hamster',
        species: 'Hamster'
    },
    {
        name: 'Carrot',
        age: 1.5,
        breed: 'Australian Dwarf',
        species: 'Rabbit'
    }
])
```

1. Change Carrot's age to 2.5
2. Replace Dash the hamster's information (using the PUT method) with the following:
Name: Dash Age: 4.5 Breed: Winter White Species: Hamster 
3. Delete Jorden, because it went to the rainbow bridge due to old age.