import React, { Component } from 'react';
import Axios from 'axios';

export default class Courses extends Component {

  state = {
    courseComponents: []
  }
  async componentDidMount() {
    const courses = await Axios.get('http://localhost:5000/api/courses');
    const courseComponents = courses.data.map(course => (
      <div className="grid-33"><a class="course--module course--link" href="#">
        <h4 class="course--label">Course</h4>
        <h3 class="course--title">{course.title}</h3>
      </a></div>
    ))

    this.setState(() => ({courseComponents}));
  }

  render() {
    return (
      <div>
        {this.state.courseComponents}
      </div>
    )
  }
}