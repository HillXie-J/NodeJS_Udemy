const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
    .then(
        () => console.log('Connected to MongoDB...')
    )
    .catch(
        err => console.error('Could not connect to MongoDB...', err)
    );

const authorSchema = new mongoose.Schema(
    {
        name: String,
        bio: String,
        website: String
    }
);


const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema(
    {
        name: String,
        authors: [authorSchema]
    }
));

async function createCourse(name, authors) {
    const course = new Course(
        {
            name,
            authors
        }
    );

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author');
    console.log(courses);
}

async function updateAuthor(courseId) {
    const course = await Course.findById(courseId);
    console.log(course);
    course.author.name = 'Mosh Hamedani';
    course.save();
}

async function updateAuthor2(courseId) {
    const course = await Course.updateOne(
        {_id: courseId},
        {
/*             $unset: {
                'author': ''
            } */
            $set: {
                'author.name': 'John'
            }
        }
    )
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

//updateAuthor2('62d9ae803950b3e830f19e4b');
//updateAuthor('62d9ae803950b3e830f19e4b');
/* 
createCourse('Node Course', [
    new Author({name: 'Mosh'}), 
    new Author({name: 'Mosh'})
    ]); */
// listCourses();
//addAuthor('62d9bc0a9cdaac08870434d8', new Author({name: 'John'}));

removeAuthor('62d9bc0a9cdaac08870434d8', '62d9bc0a9cdaac08870434d7');