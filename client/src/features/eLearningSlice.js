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
  "users/logedUser",
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
          firstName: user.firstName,
          lastName: user.lastName,
          nickname: user.nickname,
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
export const passwordCheck = createAsyncThunk(
  "users/passwordCheck",
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

export const closeAccount = createAsyncThunk(
  "users/closeAccount",
  async (params) => {
    const response = await axios.delete(`/api/users/${params}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);
export const updateUserPassword = createAsyncThunk(
  "users/updateUserPassword",
  async (user) => {
    return await axios
      .put(
        `/api/users/${user.params}`,
        { password: user.password },
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

export const fetchUserTransactions = createAsyncThunk(
  "users/transactions",
  async () => {
    return await axios
      .get(`/api/transaction`)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const createTransaction = createAsyncThunk(
  "users/addUserTransaction",
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
export const updateUserTransaction = createAsyncThunk(
  "users/updateUserTransaction",
  async (transaction) => {
    return await axios
      .put(
        `/api/transaction/${transaction.params}`,
        {
          title: transaction.title,
          amountInBAM: transaction.amountInBAM,
          amountInEUR: transaction.amountInEUR,
          amountInUSD: transaction.amountInUSD,
          currency: transaction.currency,
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

export const deleteTransaction = createAsyncThunk(
  "users/deleteTransaction",
  async (params) => {
    const response = await axios.delete(`/api/transaction/${params}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const fetchUserTransactionData = createAsyncThunk(
  "users/transactionData",
  async (params) => {
    return await axios
      .get(`/api/transaction/${params}`)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

const initialState = {
  singinUserForm: false,
  singupUserForm: false,
  signedupUser: {},
  editUserForm: false,
  editUserPasswordForm: false,

  userData: {},
  updatedUserData: {},

  loggedUser: {},
  signedOut: {},
  userToken: {},
  userDataToDisplay: {},
  closeAccount: {},
  passwordCheck: {},
  deleteAccountModal: true,
  //TRANACTIONS
  userTransactions: {},
  dashboardData: [],
  addTransaction: {},
  filter: { income: "income", expense: "expense" },
  currencyExchangeRate: 1,
  currency: "BAM",
  groupingVar: "day",
  updatedUserTransaction: {},
  deleteTransaction: {},
  userTransactionData: {},
  deleteId: "",
  openDeleteModal: false,
  transactionsOverviewLevel: "Daily",
  //STATISTICS
  filterVarForCharts: "",
  groupingVarForCharts: "day",
  chartType: "pie",
  statisticsOverviewLevel: "Week",
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

    cleanRegisteredUserData: (state, action) => {
      state.registeredUser = {};
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
    cleanTransactionData: (state, action) => {
      state.addTransaction = {};
    },
    cleanTransactionUpdatedData: (state, action) => {
      state.updatedUserTransaction = {};
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setCurrencyExchangeRate: (state, action) => {
      state.currencyExchangeRate = action.payload;
    },
    setGroupingVar: (state, action) => {
      state.groupingVar = action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    setOpenDeleteModal: (state, action) => {
      state.openDeleteModal = action.payload;
    },
    cleanDeleteTransactionData: (state, payload) => {
      state.deleteTransaction = {};
    },
    setFilterVarForCharts: (state, action) => {
      state.filterVarForCharts = action.payload;
    },
    setGroupingVarForCharts: (state, action) => {
      state.groupingVarForCharts = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setTransactionsOverviewLevel: (state, action) => {
      state.transactionsOverviewLevel = action.payload;
    },
    setStatisticsOverviewLevel: (state, action) => {
      state.statisticsOverviewLevel = action.payload;
    },
    setDeleteAccountModal: (state, action) => {
      state.deleteAccountModal = action.payload;
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
      return { ...state, updatedUserData: payload };
    },
    [closeAccount.fulfilled]: (state, { payload }) => {
      return { ...state, closeAccount: payload };
    },
    [passwordCheck.fulfilled]: (state, { payload }) => {
      return { ...state, passwordCheck: payload };
    },
    [updateUserPassword.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserData: payload };
    },
    // Courses
    [fetchUserTransactions.fulfilled]: (state, { payload }) => {
      return { ...state, userTransactions: payload };
    },
    [createTransaction.fulfilled]: (state, { payload }) => {
      return { ...state, addTransaction: payload };
    },
    [updateUserTransaction.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserTransaction: payload };
    },
    [fetchUserTransactionData.fulfilled]: (state, { payload }) => {
      return { ...state, userTransactionData: payload };
    },
    [deleteTransaction.fulfilled]: (state, { payload }) => {
      return { ...state, deleteTransaction: payload };
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

export const getUserToken = (state) => state.eLearning.userToken;
export const getErrors = (state) => state.eLearning.showErrors;
export const getUserData = (state) => state.eLearning.userData;
export const getUpdatedUserData = (state) => state.eLearning.updatedUserData;
export const getCloseAccountData = (state) => state.eLearning.closeAccount;
export const getPasswordCheckData = (state) => state.eLearning.passwordCheck;
export const getUserDataToDisplay = (state) =>
  state.eLearning.userDataToDisplay;
export const getDeleteAccountModal = (state) =>
  state.eLearning.deleteAccountModal;
///
export const getUserTransactions = (state) => state.eLearning.userTransactions;
export const getDashboardData = (state) => state.eLearning.dashboardData;
export const getTransactionData = (state) => state.eLearning.addTransaction;
export const getFilter = (state) => state.eLearning.filter;
export const getCurrencyExchangeRate = (state) =>
  state.eLearning.currencyExchangeRate;
export const getCurrency = (state) => state.eLearning.currency;
export const getGroupingVar = (state) => state.eLearning.groupingVar;
export const getUpdatedUserTransaction = (state) =>
  state.eLearning.updatedUserTransaction;
export const getUserTransactionData = (state) =>
  state.eLearning.userTransactionData;
export const getDeleteId = (state) => state.eLearning.deleteId;
export const getOpenDeleteModal = (state) => state.eLearning.openDeleteModal;
export const getDeleteAPIMessage = (state) => state.eLearning.deleteTransaction;
export const getTransactionsOverviewLevel = (state) =>
  state.eLearning.transactionsOverviewLevel;

///
export const getFilterVarForCharts = (state) =>
  state.eLearning.filterVarForCharts;
export const getGroupingVarForCharts = (state) =>
  state.eLearning.groupingVarForCharts;
export const getChartType = (state) => state.eLearning.chartType;
export const getStatisticsOverviewLevel = (state) =>
  state.eLearning.statisticsOverviewLevel;

export const {
  setSigninUserForm,
  setSignupUserForm,
  setEditUserProfileForm,
  setEditUserPasswordForm,

  userDataToDisplay,
  cleanRegisteredUserData,
  cleanUpdatedUserData,
  cleanPasswordCheckData,
  dashboardData,
  cleanTransactionData,
  setFilter,
  setCurrency,
  setCurrencyExchangeRate,
  setGroupingVar,
  cleanTransactionUpdatedData,
  setDeleteId,
  setOpenDeleteModal,
  cleanDeleteTransactionData,
  setFilterVarForCharts,
  setGroupingVarForCharts,
  setChartType,
  setTransactionsOverviewLevel,
  setStatisticsOverviewLevel,
  setDeleteAccountModal,
  cleanStore,
} = eLearningSlice.actions;

export default eLearningSlice.reducer;
