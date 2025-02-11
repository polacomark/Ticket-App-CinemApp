import { ExitToAppOutlined, Save } from "@mui/icons-material";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newCategorie } from "../../redux/actions";

const stylePaper = {
  border: "1px solid gray",
  padding: 20,
  height: "auto",
  width: 600,
  margin: "20px auto",
};

export default function AddCategoria() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    nombre: "",
  });

  function handleChangeInput(e) {
    e.preventDefault();
    setInput({
      ...input,
      nombre: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(newCategorie(input));
    setInput({
      nombre: "",
    });
  }

  return (
    <div style={{ backgroundColor: "#f3f3f3" }}>
      <Grid>
        <Typography
          fontSize={40}
          style={{
            width: "100%",
            textAlign: "center",
            color: "gray",
            paddingTop: "10px",
          }}
        >
          Registrar Categoría
        </Typography>
        <Paper style={stylePaper}>
          <TextField
            style={{ margin: 10 }}
            label="Categoria"
            size="small"
            placeholder="Nombre de la categoria"
            value={input.nombre}
            onChange={handleChangeInput}
          />
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={handleSubmit}
          >
            Subir
          </Button>
          <Link
            to={`/categorias`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ExitToAppOutlined />}
            >{`Cancelar & Regresar`}</Button>
          </Link>
        </Paper>
      </Grid>
    </div>
  );
}
