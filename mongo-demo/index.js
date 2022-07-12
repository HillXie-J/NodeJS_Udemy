const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(
        () => console.log('Connected to MongoDB...')
    )
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlenght: 5,
            maxlength: 255
        },
        category: {
            type: String,
            required: true,
            enum: ['web', 'mobile', 'network']
        },
        author: String,
        tags: {
            type: [String],
            required: true,
            validate: {
                validator(v){

/*                     const result = true;

                     setTimeout(() => {
                        const result = v.length > 0;


                    }, 2000);   */
/* 
                    return Promise.resolve(
                        
                        () => {
                            return false;
                        }
                        
                        
                        ); */

                    const promise = new Promise(
                        (resolve, reject) => {


                            setTimeout(() => {
                                const result = v.length > 0;
                                resolve(result);
        
                            }, 4000);
                            

                    });

                    return promise;

                },
                message: 'A course should have at least one tag.'
            }
        },
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        price: {
            type: Number,
            required: function () {
                return this.isPublished;
            },
            min: 10,
            max: 200
        }
    }

);



const Course = mongoose.model('Course', courseSchema);


async function createCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
         tags: ['angular', 'frontend'],
        // tags:[],
        // tags: null,
        isPublished: true,
        category: '_',
        price: 15
    });

    try {
        const result = await course.save();

        console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }

}


createCourse();

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

// removeCourse('62c72a378b5261a63c02c85d');

// updateCourse('62c72a378b5261a63c02c85d');

// getCourses();