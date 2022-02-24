// db.animals.updateMany({

// },{
//     $set: {
//         'checkups.$[doctor].diagnosis':'redacted'
//     },
// },
//     {
//         arrayFilters:[ 
//             {
//                 'doctor.name':'Dr Chua'
//             }
//         ]
//     }
// )


db.heroes.insertMany([
    {
        'name': 'Roger',
        'skills': [
            {
                'name': 'Fireball',
                'damage': [{
                        'type': 'hit',
                        'min_damage': 10,
                        'max_damage': 20,
                        'element': 'fire',
                    },
                    {
                        'type': 'dot',
                        'min_damage': 3,
                        'max_damage': 6,
                        'element': 'fire',
                    },
                    {
                        'type': 'splash',
                        'min_damage': 10,
                        'max_damage': 20,
                        'element': 'sonic'
                    }
                ]
            },
            {
                'name': "Dragonfire",
                'damage':[
                    {
                        'type':'initial',
                        'element':'fire',
                        'min_damage':10,
                        'max_damage':20
                    }
                ]
            }
        ]
    },
    {
        'name':'Alan',
        'skills':[
            {
                'name': "Dragonfire",
                'damage':[
                    {
                        'type':'initial',
                        'element':'fire',
                        'min_damage':10,
                        'max_damage':20
                    }
                ]
            }
        ]
    }

])

// update all fire damage to be 10000
db.heroes.updateMany(
    {},
    {
        '$set':{
            "skills.$[].damage.$[eachDamage].max_damage":100
        }
    },
    {
        'arrayFilters':[
            {"eachDamage.element":'fire'}
        ]
    }
)

db.heroes.insertOne({
    'name':'Ken',
    'skills':[]
}
)
// find all damage objects that has element 'fire'
db.heroes.aggregate([
    {$match:{'skills.damage.element':'fire'}},
    {$project:{
        'skills.damage':{
            $filter:{
                'input':'$skills.damage',
                'as':'damage',
                'cond':{$eq: ['$damage.element', 'fire']}
            }
        }
    }}
])

db.heroes.aggregate([
    {$match:{'skills.damage.element':'fire'}},
    {$project:{
        'skills':{
            $filter:{
                'input':'$skills',
                'as':'skill',
                'cond':{$eq: ['$$skill.name', 'Dragonfire']}
            }
        }
    }}
])

db.heroes.aggregate([
    {'$unwind':'$skills'},
    {'$unwind':'$skills.damage'},
    {'$match':{
        'skills.damage.element':'fire'
    }},
    {'$project':{
        'damage':'$skills.damage'
    }}
]).pretty()
