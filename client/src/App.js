import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BasicTable() {
  function componentDidMount() {
    this.setState({});
  }

  var rows = [
    { name: "aa", Notes: "1" },
    { name: "bb", Notes: "1" },
    { name: "cc", Notes: "1" },
    { name: "dd", Notes: "1" },
    { name: "ee", Notes: "1" },
  ];

  async function fetchCsv(value) {
    console.log(value);
    await axios
      .get("http://localhost:4000/csv/" + value)
      .then(function (response) {
        console.log(response.data);
        rows = response.data;
      });
    componentDidMount();
    return true;
  }

  const classes = useStyles();
  const [age, setAge] = React.useState("");

  var flag = 0;
  const handleChange = async (event) => {
    setAge(event.target.value);
    await fetchCsv(event.target.value);
    if (flag === 0) {
      flag = 1;
      handleChange(event);
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={"raw_data1"}>CSV 1</MenuItem>
          <MenuItem value={"raw_data2"}>CSV 2</MenuItem>
          <MenuItem value={"raw_data3"}>CSV 3</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.Notes}</TableCell>
                <TableCell align="right">{row.Notes}</TableCell>
                <TableCell align="right">{row.Notes}</TableCell>
                <TableCell align="right">{row.Notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
