const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(
        () => console.log('Connected to MongoDB...')
    )
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    }

);

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });



    const result = await course.save();

    console.log(result);

}


//createCourse();

async function getCourses() {

    const pageNumber = 1;
    const pageSize = 10;

    const course = await Course
        .find({ author: /^Mosh/ })
        .skip((pageNumber - 1) * pageSize)
        //.find()
        //.or([{author: 'Mosh'}, {isPublished: true}])
        //.find({author: 'Mosh', isPublished: true})
        //.find({price: {$gte: 10, $lte: 20}})
        //.find({price: {$in: [10, 15, 20]}})
        .limit(pageSize)
        .sort({ name: 1 })
        //.select({name: 1, tags: 1});
        .count();
    console.log(course);
}

async function updateCourse(id) {

    const result = await Course.findByIdAndUpdate(
        id
        , {
            $set: {
                author: 'Mosh2',
                isPublished: true
            }

        }, { new: true });


    /*     const course = await Course.findById(id);
    
        if (!course) return;
    
        // course.isPublished = true;
        course.set({
            isPublished: true,
            author: 'Another Author'
        });
    
        const result = await course.save(); */

    console.log(result);

}

async function removeCourse(id) {


/*     const result = await Course.deleteOne(
        {_id: id}
    );
 */

    const result = await Course.findByIdAndDelete(id);

    console.log(result);

}

removeCourse('62c72a378b5261a63c02c85d');

// updateCourse('62c72a378b5261a63c02c85d');

// getCourses();