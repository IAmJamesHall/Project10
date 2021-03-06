import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { getAuthHeaders } from "../bin/auth";

class DeleteCourse extends Component {
  state = {
    redirect: true,
  };

  async componentDidMount() {
    const { courseId } = this.props.match.params;
    const { user } = this.props;

    try {
      // get course to delete
      const getResponse = await axios.get(
        `${this.props.serverLocation}/api/courses/${courseId}`
      );
      if (getResponse.status !== 404) {
        // if course exists
        const course = getResponse.data;

        // if user owns course
        if (this.props.user.userId === course.User.id) {
          // attempt deleting the course
          await axios({
            method: "delete",
            url: `${this.props.serverLocation}/api/courses/${courseId}`,
            headers: getAuthHeaders(user.emailAddress, user.password),
          });
          // course successfully deleted
          this.props.history.push("/courses");
        }
      }
    } catch {
      this.props.history.push("/error");
    }
  }

  render() {
    return null;
  }
}

export default withRouter(DeleteCourse);
