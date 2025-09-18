import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GeneroList from './Genero/GeneroList';
import DirectorList from './Director/DirectorList';
import ProductoraList from './Productora/ProductoraList';
import TipoList from './Tipo/TipoList';
import MediaList from './Media/MediaList';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestión de Películas
          </Typography>
          <StyledLink to="/generos">
            <Button color="inherit">Géneros</Button>
          </StyledLink>
          <StyledLink to="/directores">
            <Button color="inherit">Directores</Button>
          </StyledLink>
          <StyledLink to="/productoras">
            <Button color="inherit">Productoras</Button>
          </StyledLink>
          <StyledLink to="/tipos">
            <Button color="inherit">Tipos</Button>
          </StyledLink>
          <StyledLink to="/media">
            <Button color="inherit">Películas y Series</Button>
          </StyledLink>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route path="/generos" element={<GeneroList />} />
            <Route path="/directores" element={<DirectorList />} />
            <Route path="/productoras" element={<ProductoraList />} />
            <Route path="/tipos" element={<TipoList />} />
            <Route path="/media" element={<MediaList />} />
            <Route path="/" element={<MediaList />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
