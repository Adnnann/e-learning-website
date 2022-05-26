import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseToEdit,
  getUpdateCourseStatus,
  updateCourse,
  uploadImage,
  cleanCourseUpdatedMessage,
  fetchCourses,
  getUploadUserImageStatus,
  cleanUploadImageStatus,
  getLoggedUserData,
  fetchMentorCourses,
} from "../../features/eLearningSlice";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Grid,
} from "@mui/material";
import TextFieldsGenerator from "../utils/TextFieldsGenerator";
import SelectComponent from "../utils/SelectComponent";
import ImagePlaceholder from "../../assets/imagePlaceholder.png";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  tittle: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
    marginRight: theme.spacing(2),
  },
  cancel: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
  },
  userImagePlaceholder: {
    width: 130,
    height: 130,
    marginTop: "40px",
    marginBottom: "20px",
  },
  uploadPhoto: {
    minWidth: "125px",
  },
  selectFields: {
    height: "60px",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: "1px",
  },
}));

const EditCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseToEdit = useSelector(getCourseToEdit);
  const updateCourseStatus = useSelector(getUpdateCourseStatus);
  const uploadImageStatus = useSelector(getUploadUserImageStatus);
  const loggedUser = useSelector(getLoggedUserData);
  const classes = useStyles();

  useEffect(() => {
    if (updateCourseStatus?.message) {
      if (loggedUser.user.role === "mentor") {
        const courses = {
          mentorId: loggedUser.user._id,
          firstItem: 1,
          lastItem: 11,
        };
        dispatch(cleanCourseUpdatedMessage());
        dispatch(cleanUploadImageStatus());
        dispatch(fetchMentorCourses(courses));
        navigate("/dashboard");
        return;
      }

      const course = {
        filterTerm: "",
        filterLevel: "",
        filterDuration: "",
        page: 1,
        firstValue: 1,
        lastValue: 12,
      };

      dispatch(fetchCourses(course));
      dispatch(cleanCourseUpdatedMessage());
      dispatch(cleanUploadImageStatus());
      navigate("/courses");
    }
  }, [updateCourseStatus]);

  const { title, level, description, duration } = courseToEdit;

  const [values, setValues] = useState({
    title: title,
    description: description,
    level: level,
    duration: duration,
  });

  const handleChange = (name) => (event) => {
    const course = {
      [name]: event.target.value,
    };
    setValues({
      ...values,
      ...course,
    });
  };

  const courseDataToEdit = ["title", "description"];
  const levels = ["Beginner Level", "Intermediate Level", "Advanced Level"];
  const durations = [
    "0 - 3 Hours",
    "3 - 6 Hours",
    "6 - 12 Hours",
    "1 - 2 Days",
    "2 - 5 Days",
    "5 - 15 Days",
  ];

  const labels = ["Title", "Description"];
  const types = ["text", "text"];

  const clickSubmit = () => {
    const course = {
      param: courseToEdit._id,
      data: {
        ...values,
      },
    };
    dispatch(updateCourse(course));
  };

  const cancel = () => {
    if (loggedUser.user.role === "admin") {
      navigate("/courses");
    } else {
      navigate("/dashboard");
    }
  };

  const uploadPhoto = () => {
    document.getElementById("uploadImage").click();
  };

  const handleUpload = (event) => {
    let formData = new FormData();
    formData.append(
      "userImage",
      event.target.files[0],
      `course_image_${courseToEdit._id}-${Date.now()}.${
        event.target.files[0].name.split(".")[1]
      }`
    );
    dispatch(uploadImage(formData, { id: "test" }));
  };

  return (
    <Card className={classes.card}>
      <input
        type="file"
        style={{ visibility: "hidden" }}
        id="uploadImage"
        onChange={handleUpload}
      />
      <div
        style={{
          backgroundColor: "blue",
          minHeight: "50px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            paddingTop: "5px",
            paddingBottom: "5px",
            color: "white",
          }}
        >
          Edit
        </h2>
      </div>

      <Grid container justifyContent={"center"} spacing={2}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextFieldsGenerator
            array={courseDataToEdit}
            handleChange={handleChange}
            values={values}
            value={courseDataToEdit}
            labels={labels}
            types={types}
          />
          Level
          <SelectComponent
            selectedValue={values.level}
            array={levels}
            handleChange={handleChange("level")}
            className={classes.selectFields}
          />
          <ButtonGroup style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              style={{ marginRight: "10px" }}
              onClick={clickSubmit}
            >
              Save
            </Button>
            <Button variant="contained" onClick={cancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <p style={{ marginBottom: "0" }}>Duration</p>
          <SelectComponent
            selectedValue={values.duration}
            array={durations}
            handleChange={handleChange("duration")}
            className={classes.selectFields}
          />
          <CardMedia
            className={classes.userImagePlaceholder}
            src={
              uploadImageStatus?.message
                ? uploadImageStatus.imageUrl
                : courseToEdit.courseImage !== ""
                ? courseToEdit.courseImage
                : ImagePlaceholder
            }
            component="img"
          ></CardMedia>
          <Button variant="contained" onClick={uploadPhoto}>
            Upload photo
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EditCourse;
