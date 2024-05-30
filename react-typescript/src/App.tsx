const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }
  
  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[],
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  interface HeaderProps {
    name: string;
  }

  interface ContentProps {
    courses: CoursePart[]
  }

  interface ExerciseTotalProps {
    total: number;
  }

  interface PartProps {
    course: CoursePart;
  }

  const Part = ({ course }: PartProps) => {
    switch (course.kind) {
      case "basic":
        return (
          <div>
            <b>{course.name} {course.exerciseCount}</b>
            <div>
              <i>{course.description}</i>
            </div>
          </div>
        )
      case "group":
        return (
          <div>
            <b>{course.name} {course.exerciseCount}</b>
            <div>
              project exercises {course.groupProjectCount}
            </div>
          </div>
        )
      case "background":
        return (
          <div>
            <b>{course.name} {course.exerciseCount}</b>
            <div>
              <i>{course.description}</i>
            </div>
            <div>
              submit to {course.backgroundMaterial}
            </div>
          </div>
        )
      case "special":
        return (
          <div>
            <b>{course.name} {course.exerciseCount}</b>
            <div>
              <i>{course.description}</i>
            </div>
            <div>
              required skills: {course.requirements.map(
              requirement => course.requirements.indexOf(requirement) === course.requirements.length - 1 ? requirement : requirement + ', ' 
              )}
            </div>
          </div>
        )  
      default: 
        return assertNever(course)
    }
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
  }

  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courses.map((course) => (
          <div key={course.name}>
            <p></p>
            <Part course={course}/>
            </div>
        ))}
      </div>
    )
  }

  const Total = (props: ExerciseTotalProps) => {
    return (
      <div>
        <p>
          Number of exercises {props.total}
        </p> 
      </div>
    )
  }

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }


  return (
    <div>
      <Header name={courseName}/>
      <Content courses={courseParts} />
      <Total total={totalExercises}/>
    </div>
  );
};

export default App;