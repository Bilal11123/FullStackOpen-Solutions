const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
    </div>
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ course }) => {
  return (
    <div>
        {course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      <p>
        <strong>
          total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </strong>
      </p>
    </div>
  )
}

export default Course