import * as React from "react";
import { useSelector } from "react-redux";
import { getUsersDisplayPage } from "../../features/eLearningSlice";
import {
  Typography,
  Grid,
  Card,
  Item,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Button,
  Popover,
} from "@mui/material";
import { usePopupState, bindPopover } from "material-ui-popup-state/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Courses = ({ array, selectCourse, handleCheckbox }) => {
  const page = useSelector(getUsersDisplayPage);
  const numberOfPages = Math.ceil(array.length / 12);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  const enroll = () => {
    popupState.close();
  };

  return page === numberOfPages && numberOfPages % 2 !== 0
    ? array
        .filter((item) => item.completed === false)
        .slice((numberOfPages - 1) * 12 + 1, array.length)
        .map((item, index) => (
          <Grid item xs={12} md={3} lg={3} xl={3} key={index}>
            <Item>
              <Card onMouseOver={selectCourse}>
                <CardMedia
                  onMouseOver={popupState.open}
                  style={{ width: "220px", margin: "0 auto" }}
                  component="img"
                  src="https://image.shutterstock.com/image-photo/bascarsija-square-sebilj-wooden-fountain-260nw-574540984.jpg"
                ></CardMedia>
                <CardContent>
                  <h2 style={{ fontWeight: "bolder" }}>{item.title}</h2>
                  <Typography component="p">{item.menthorName}</Typography>
                  <span style={{ display: "inline-flex", marginTop: "20px" }}>
                    {" "}
                    <Checkbox
                      checked={
                        array.filter((course) => course.title === item.title)[0]
                          .completed
                      }
                      onChange={handleCheckbox}
                    />
                    <Typography component="p" marginTop={1}>
                      Completed
                    </Typography>
                  </span>
                </CardContent>
              </Card>
            </Item>

            <div>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Card>
                      <h2
                        style={{
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          fontWeight: "bolder",
                        }}
                      >
                        What you will learn
                      </h2>
                      <br />
                      <Typography style={{ paddingLeft: "20px" }} variant="h4">
                        Lorem ipusm tra lal la ala.
                      </Typography>
                      <br />
                      <Typography style={{ paddingLeft: "20px" }} variant="h6">
                        Lorem ipusm tra lal la ala.
                      </Typography>
                      <br />
                      <Typography style={{ paddingLeft: "20px" }} variant="h6">
                        Lorem ipusm tra lal la ala.
                      </Typography>
                      <br />
                      <Typography style={{ paddingLeft: "20px" }} variant="h6">
                        Lorem ipusm tra lal la ala.
                      </Typography>
                      <CardActions>
                        <div style={{ margin: "0 auto" }}>
                          <Button variant="contained" onClick={enroll}>
                            Enroll in course
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Popover>
            </div>
          </Grid>
        ))
    : array
        .filter((item) => item.completed === false)
        .slice(page * 12 - 11, page * 12 + 1)
        .map((item, index) => (
          <Grid item xs={12} md={3} lg={3} xl={3} key={index}>
            <Item>
              <Card onMouseOver={() => selectCourse(index)}>
                <CardMedia
                  onMouseOver={popupState.open}
                  style={{ width: "220px", margin: "0 auto" }}
                  component="img"
                  src="https://image.shutterstock.com/image-photo/bascarsija-square-sebilj-wooden-fountain-260nw-574540984.jpg"
                ></CardMedia>
                <CardContent>
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                    {item.title}
                  </Typography>
                  <Typography component="p" style={{ textAlign: "center" }}>
                    {item.menthorName}
                  </Typography>
                  <span
                    style={{
                      display: "inline-flex",
                      marginTop: "20px",
                      margin: "0 auto",
                    }}
                  >
                    {" "}
                    <Checkbox
                      checked={
                        array.filter((course) => course.title === item.title)[0]
                          .completed
                          ? true
                          : false
                      }
                      onClick={() => handleCheckbox(item.title)}
                    />
                    <Typography component="p" marginTop={1}>
                      Completed
                    </Typography>
                  </span>
                </CardContent>
              </Card>
            </Item>

            <div>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Card>
                      <h2
                        style={{
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          marginBottom: "2px",
                        }}
                      >
                        What you will learn
                      </h2>
                      {item.description.map((item) => {
                        return (
                          <>
                            <span style={{ display: "inline-flex" }} key={item}>
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                  fontSize: "24px",
                                  marginLeft: "20px",
                                  marginRight: "10px",
                                }}
                              />
                              <p
                                style={{
                                  fontSize: "18px",
                                  marginRight: "20px",
                                  marginBottom: "2px",
                                  fontWeight: "bold",
                                  marginTop: "0px",
                                }}
                              >
                                {item}
                              </p>
                            </span>
                            <br />
                          </>
                        );
                      })}

                      <CardActions>
                        <div style={{ margin: "0 auto" }}>
                          <Button variant="contained" onClick={enroll}>
                            Enroll in course
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Popover>
            </div>
          </Grid>
        ));
};

export default Courses;
