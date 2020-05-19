const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.DB_REMOTE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Successfully connected to the database.`);
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.set("useCreateIndex", true);

const usersRouter = require("./routes/users.route");
const tournamentRouter = require("./routes/tournaments.route");
const teamsRouter = require("./routes/teams.route");
const matchesRouter = require("./routes/matches.route");
const guessRouter = require("./routes/guess.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRouter);
app.use("/teams", teamsRouter);
app.use("/tournaments", tournamentRouter);
app.use("/matches", matchesRouter);
app.use("/guess", guessRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
