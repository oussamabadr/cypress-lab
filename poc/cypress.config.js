const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    charts: true,
    json: false,
    timestamp: "longDate",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
  },
});
