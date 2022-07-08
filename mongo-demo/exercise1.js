const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(
    () => console.log('connected to db mongo-exercises')
).catch(
    err => console.error('Could not connect to MongoDB...', err)
);

const courseSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags: [String],
        date: {type: Date, default: Date.now},
        isPublished: Boolean,
        price: Number
    }
);

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {

    return await Course
.find({isPublished: true})
.or([{price: {$gte:15}}, {name: /.* by .*/i}] );
    //.or([{tags:'backend'}, {tags:'frontend'}]) 
/*     .sort({price: -1})
    .select({name: 1, author: 1, price:1}); */

/*     return await Course
        .find({isPublished: true, tags: {$in:['frontend', 'backend']}})
        //.or([{tags:'backend'}, {tags:'frontend'}]) 
        .sort({price: -1})
        .select({name: 1, author: 1, price:1}); */


/*     return await Course
//         .find()
  //      .and([{tags: {$all: 'backend'}}, {isPublished: true}]) 
        .find({isPublished: true, tags: 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1}); */

}

getCourses().then(course => console.log('Course', course));

