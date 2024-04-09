const config = {
  screens: {
    Home: {
      path: "home",
    },
    Notification:{
      path: "notification",
    },
    TaskDetail:{
      path: "task-detail/:id",
    },
  },
};

const linking = {
  prefixes: ["todoapp://app"],
  config,
};

export default linking;
