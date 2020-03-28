const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' },
  { id: 5, name: 'course5' },
  { id: 6, name: 'course6' },
  { id: 7, name: 'course7' },
  { id: 8, name: 'course8' },
  { id: 9, name: 'course9' },
  { id: 10, name: 'course10' },
  { id: 11, name: 'course11' },
  { id: 12, name: 'course12 - my age' },
]
const raghav = [
    { id: 'age', name: '12 years' },
    { id: 'height', name: '5 feet 1 inch' },
    { id: 'weight', name: '86 pounds' },
    { id: 'haircolor', name: 'black' },
    { id: 'eyecolor', name: 'brown' },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.get('/api/raghav', (req, res) => {
    res.send(raghav)
})

app.get('/api/courses/:id', (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) {
    return res.status(404).send('The course with the given ID was not found. Please try again later. If the problem continues to persist, call us at 7329703392. ')
  }
  res.send(course)
})

app.get('/api/raghav/:id', (req, res) => {
    let raghavh = raghav.find((c) => c.id === req.params.id)
    if (!raghavh) {
      return res.status(404).send('The course with the given ID was not found. Please try again later. If the problem continues to persist, call us at 7329703392. ')
    }
    res.send(raghavh)
  })

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) {
    //400 bad request
   return res.status(400).send(error.details[0].message)
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.')
  }

  const { error } = validateCourse(req.body)
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message)
  }
  course.name = req.body.name
  res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) {
    res.status(404).send('The course with the given ID was not found.')
  }
  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
})

function validateCourse (course) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))