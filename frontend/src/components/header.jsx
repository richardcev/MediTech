// src/components/Header.jsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';

function Header({ onNavigate }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
        variant="h6" 
        sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        component={Link} 
        to="/"
        >
          SoftMed
        </Typography>
        <Button color="inherit" onClick={() => onNavigate('/pacientes')}>Pacientes</Button>
        <Button color="inherit" onClick={() => onNavigate('agenda')}>Agenda Médica</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
