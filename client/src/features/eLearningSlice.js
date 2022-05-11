import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const signupUser = createAsyncThunk(
  "eLearning/signedupUser",
  async (user) => {
    return await axios
      .post(`api/users/`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const signinUser = createAsyncThunk(
  "users/loggedUser",
  async (userData) => {
    return await axios
      .post("/auth/signin", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const signoutUser = createAsyncThunk("users/user", async () => {
  const response = await axios.post("/auth/signout");
  return response.data;
});

export const userToken = createAsyncThunk("users/protected", async () => {
  return await axios
    .get("/protected", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => response.data)
    .catch((error) => error.message);
});

export const fetchUserData = createAsyncThunk(
  "users/profile",
  async (params) => {
    return await axios
      .get(`/api/users/${params}`)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (user) => {
    return await axios
      .put(
        `/api/users/${user.params}`,
        {
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => error);
  }
);
export const updateUserPassword = createAsyncThunk(
  "eLearning/updatePassword",
  async (user) => {
    return await axios
      .put(`api/users/updateUserPassword/${user.param}`, user.data, {
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const closeAccount = createAsyncThunk(
  "users/closeAccountStatus",
  async (user) => {
    const response = await axios.delete(`/api/users/${user.param}`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);
export const fetchUserCourses = createAsyncThunk(
  "/eLearning/userCourses",
  async () => {
    return await axios
      .get(`/api/courses`)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const createCourse = createAsyncThunk(
  "users/addUserCourse",
  async (transaction) => {
    return await axios
      .post(`/api/transaction`, transaction, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);
export const updateUserCourse = createAsyncThunk(
  "users/updateUserCourse",
  async (course) => {
    return await axios
      .put(`/api/transaction/${course.param}`, course.data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const deleteCourse = createAsyncThunk(
  "users/deleteCourse",
  async (param) => {
    const response = await axios.delete(`/api/transaction/${param}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const fetchUserCourseData = createAsyncThunk(
  "users/transactionData",
  async (param) => {
    return await axios
      .get(`/api/transaction/${param}`)
      .then((response) => response.data)
      .catch((error) => error);
  }
);
//upload image
export const uploadUserImage = createAsyncThunk(
  "library/uploadImage",
  async (file) => {
    return await axios
      .post("/uploadImage", file)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

// admin
export const fetchAllUsers = createAsyncThunk(
  "eLearning/allUsers",
  async (param) => {
    return await axios
      .get(`/admin/users`)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const fetchCourses = createAsyncThunk(
  "eLearning/courses",
  async (courses) => {
    return await axios
      .post(`/admin/courses`, {
        page: courses.page,
        firstValue: courses.firstItem,
        lastValue: courses.lastItem,
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const fetchUsers = createAsyncThunk("eLearning/users", async (users) => {
  return await axios
    .post(`/admin/users`, {
      firstValue: users.firstItem,
      lastValue: users.lastItem,
    })
    .then((response) => response.data)
    .catch((error) => error);
});

const initialState = {
  // user data
  singinUserForm: false,
  singupUserForm: false,
  signedupUser: {},
  editUserForm: false,
  editUserPasswordForm: false,
  uploadImage: {},
  updatePassword: {},
  closeAccountForm: false,
  closeAccountModal: false,
  userData: {},
  updatedUserData: {},
  loggedUser: {},
  signedOut: {},
  userToken: {},
  userDataToDisplay: {},
  closeAccountStatus: {},
  passwordCheck: {},
  deleteAccountModal: true,
  // admin
  allUsers: {},
  usersDisplayPage: 1,
  allCourses: {},
  coursesDisplayPage: 1,
  courses: {},
  users: {},
  // courses
  userCourses: {},
  dashboardData: [],
  addCourse: {},
  filter: { duration: "", level: "", title: "" },
  updatedUserCourse: {},
  deleteCourse: {},
  userCourseData: {},
};

const eLearningSlice = createSlice({
  name: "eLearning",
  initialState,
  reducers: {
    setSigninUserForm: (state, action) => {
      state.singinUserForm = action.payload;
    },
    setSignupUserForm: (state, action) => {
      state.singupUserForm = action.payload;
    },
    setEditUserProfileForm: (state, action) => {
      state.editUserForm = action.payload;
    },
    setEditUserPasswordForm: (state, action) => {
      state.editUserPasswordForm = action.payload;
    },
    clearUpdatePassword: (state, action) => {
      state.updatePassword = {};
    },
    setCloseAccountForm: (state, action) => {
      state.closeAccountForm = action.payload;
    },
    setCloseAccountModal: (state, action) => {
      state.closeAccountModal = action.payload;
    },
    cleanSignupMessage: (state, action) => {
      state.signedupUser = {};
    },
    cleanLoginMessage: (state, action) => {
      state.loggedUser = {};
    },
    cleanUpdatedUserData: (state, action) => {
      state.updatedUserData = {};
    },
    cleanPasswordCheckData: (state, action) => {
      state.passwordCheck = {};
    },
    userDataToDisplay: (state, action) => {
      state.userDataToDisplay = action.payload;
    },
    dashboardData: (state, action) => {
      state.dashboardData = [...state.dashboardData, action.payload];
    },
    cleanCourseData: (state, action) => {
      state.addCourse = {};
    },
    cleanCourseUpdatedData: (state, action) => {
      state.updatedUserCourse = {};
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    cleanDeleteCourseData: (state, payload) => {
      state.deleteCourse = {};
    },
    setCoursesOverviewLevel: (state, action) => {
      state.transactionsOverviewLevel = action.payload;
    },
    setStatisticsOverviewLevel: (state, action) => {
      state.statisticsOverviewLevel = action.payload;
    },
    setDeleteAccountModal: (state, action) => {
      state.deleteAccountModal = action.payload;
    },
    setUsersDisplayPage: (state, action) => {
      state.usersDisplayPage = action.payload;
    },
    setCoursesDisplayPage: (state, action) => {
      state.coursesDisplayPage = action.payload;
    },
    //reset store state after logout or delete of account
    cleanStore: () => initialState,
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      return { ...state, signedupUser: payload };
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      return { ...state, loggedUser: payload };
    },
    [signoutUser.fulfilled]: (state, { payload }) => {
      return { ...state, signedOut: payload };
    },
    [userToken.fulfilled]: (state, { payload }) => {
      return { ...state, userToken: payload };
    },
    [fetchUserData.fulfilled]: (state, { payload }) => {
      return { ...state, userData: payload };
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        updatedUserData: payload,
        loggedUser: {
          token: payload.token,
          user: payload.data,
        },
      };
    },
    [closeAccount.fulfilled]: (state, { payload }) => {
      return { ...state, closeAccountStatus: payload };
    },
    [updateUserPassword.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserData: payload };
    },
    // Courses
    [fetchUserCourses.fulfilled]: (state, { payload }) => {
      return { ...state, userCourses: payload };
    },
    [createCourse.fulfilled]: (state, { payload }) => {
      return { ...state, addCourse: payload };
    },
    [updateUserCourse.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserCourse: payload };
    },
    [fetchUserCourseData.fulfilled]: (state, { payload }) => {
      return { ...state, userCourseData: payload };
    },
    [deleteCourse.fulfilled]: (state, { payload }) => {
      return { ...state, deleteCourse: payload };
    },
    [uploadUserImage.fulfilled]: (state, { payload }) => {
      if (payload.imageUrl) {
        void (state.loggedUser.user.userImage = payload.imageUrl);
        void (state.uploadImage = null);
      } else {
        return { ...state, uploadImage: payload };
      }
    },
    [updateUserPassword.fulfilled]: (state, { payload }) => {
      return { ...state, updatePassword: payload };
    },
    // admin
    [fetchAllUsers.fulfilled]: (state, { payload }) => {
      return { ...state, allUsers: payload };
    },

    [fetchCourses.fulfilled]: (state, { payload }) => {
      return { ...state, courses: payload };
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      return { ...state, users: payload };
    },
  },
});

export const getSigninUserFormStatus = (state) =>
  state.eLearning.singinUserForm;
export const getSignupUserFormStatus = (state) =>
  state.eLearning.singupUserForm;
export const getSignedUser = (state) => state.eLearning.signedupUser;
export const getLoggedUserData = (state) => state.eLearning.loggedUser;
export const getEditUserFormStatus = (state) => state.eLearning.editUserForm;
export const getEditUserPasswordFormStatus = (state) =>
  state.eLearning.editUserPasswordForm;
export const getUploadUserImageStatus = (state) => state.eLearning.uploadImage;
export const getUpdateUserPasswordStatus = (state) =>
  state.eLearning.updatePassword;
export const getCloseAccountFormStatus = (state) =>
  state.eLearning.closeAccountForm;
export const getCloseAccountModalStatus = (state) =>
  state.eLearning.closeAccountModal;
export const getUserToken = (state) => state.eLearning.userToken;
export const getErrors = (state) => state.eLearning.showErrors;
export const getUserData = (state) => state.eLearning.userData;
export const getUpdatedUserData = (state) => state.eLearning.updatedUserData;
export const getCloseAccountStatus = (state) =>
  state.eLearning.closeAccountStatus;
export const getPasswordCheckData = (state) => state.eLearning.passwordCheck;
export const getUserDataToDisplay = (state) =>
  state.eLearning.userDataToDisplay;
export const getDeleteAccountModal = (state) =>
  state.eLearning.closeAccountModal;
///
export const getUserCourses = (state) => state.eLearning.userCourses;
export const getDashboardData = (state) => state.eLearning.dashboardData;
export const getCourseData = (state) => state.eLearning.addCourse;
export const getFilter = (state) => state.eLearning.filter;
export const getUsersDisplayPage = (state) => state.eLearning.usersDisplayPage;
export const getCoursesDisplayPage = (state) =>
  state.eLearning.coursesDisplayPage;

export const getUpdatedUserCourse = (state) =>
  state.eLearning.updatedUserCourse;
export const getUserCourseData = (state) => state.eLearning.userCourseData;
export const getDeleteId = (state) => state.eLearning.deleteId;
export const getOpenDeleteModal = (state) => state.eLearning.openDeleteModal;
export const getDeleteCourseMessage = (state) => state.eLearning.deleteCourse;
export const getCoursesOverviewLevel = (state) =>
  state.eLearning.transactionsOverviewLevel;

// admin
export const getUsers = (state) => state.eLearning.users;
export const getCourses = (state) => state.eLearning.courses;

export const {
  setSigninUserForm,
  setSignupUserForm,
  setEditUserProfileForm,
  setEditUserPasswordForm,
  clearUpdatePassword,
  setCloseAccountForm,
  setCloseAccountModal,
  cleanRegisteredUserData,
  cleanUpdatedUserData,
  cleanPasswordCheckData,
  dashboardData,
  cleanCourseData,
  setFilter,
  cleanCourseUpdatedData,
  setOpenDeleteModal,
  cleanDeleteCourseData,
  setCoursesOverviewLevel,
  setStatisticsOverviewLevel,
  setDeleteAccountModal,
  cleanStore,
  cleanLoginMessage,
  cleanSignupMessage,
  //admin
  setUsersDisplayPage,
  setCoursesDisplayPage,
} = eLearningSlice.actions;

export default eLearningSlice.reducer;
