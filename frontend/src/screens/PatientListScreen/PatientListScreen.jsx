import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { 
  Button, 
  IconButton, 
  Tooltip, 
  Box, 
  Typography,
  Stack,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Función para dar formato a la fecha (yyyy-mm-dd → dd/mm/yyyy)
const formatDateOnly = (isoDate) => {
  if (!isoDate) return ''; // Manejo de caso nulo o indefinido
  const parts = isoDate.split('T')[0].split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`; // Formato dd/mm/yyyy
};

const PatientListScreen = () => {
  const [pacientes, setPacientes] = useState([]);
  const [fecha, setFecha] = useState(dayjs());
  const [busqueda, setBusqueda] = useState('nombres');
  const [filterBackend, setfilterBackend] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Definición de columnas con la nueva columna de acciones
  const columns = [
    { field: 'cedula', headerName: 'Cédula', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'apellidos', headerName: 'Apellidos', width: 150 },
    { field: 'nombres', headerName: 'Nombres', width: 150 },
    { 
      field: 'sexo', 
      headerName: 'Sexo', 
      width: 100, 
      // align: 'center',
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          color={params.value === 'M' ? 'primary' : 'secondary'}
          sx={{ minWidth: 60 }}
        />
      )
    },
    { field: 'telefono', headerName: 'Teléfono', width: 130 },
    // { field: 'correo', headerName: 'Correo', width: 150},
    {
      field: 'edad',
      headerName: 'Edad',
      width: 100
    },
    {
      field: 'peso',
      headerName: 'Peso',
      width: 100
    },
    {
      field: 'altura',
      headerName: 'Altura',
      width: 100
    },
    {
      field: 'tipo_sangre',
      headerName: 'Tipo de Sangre',
      width: 100
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha Registro',
      width: 150,
      align: 'center',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar paciente">
            <IconButton 
              size="small" 
              color="primary" 
              onClick={() => handleEditPatient(params.row.id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Eliminar paciente">
            <IconButton 
              size="small" 
              color="error" 
              onClick={() => handleDeletePatient(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
        </Box>
      ),
    },
  ];

  const calcularEdad = (fechaNacimiento) => {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }

      return edad;
  }

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/v1/pacientes/');
        const data = await response.json();

        const withIds = data.map((p, index) => ({
          id: p.id || index + 1,
          ...p,
        }));

        const formattedData = withIds.map((p) => ({
          ...p,
          fecha_registro: formatDateOnly(p.fecha_registro),
          edad: calcularEdad(p.fecha_nacimiento)
        }));

        setPacientes(formattedData);
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleChangeBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const getValuesFilter = () => {
    setLoading(true);
    const url = `http://localhost:8000/api/v1/pacientes/?${busqueda}=${filterBackend}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const withIds = data.map((p, index) => ({
          id: p.id || index + 1,
          ...p,
        }));

        const formattedData = withIds.map((p) => ({
          ...p,
          fecha_registro: formatDateOnly(p.fecha_registro),
          edad: calcularEdad(p.fecha_nacimiento)
        }));

        setPacientes(formattedData);
      })
      .catch((error) => console.error('Error fetching pacientes:', error))
      .finally(() => setLoading(false));
  };

  // Funciones para manejar las acciones de editar y eliminar
  const handleEditPatient = (id) => {
    console.log(`Editar paciente con ID: ${id}`);
    navigate(`/paciente/${id}/editar`);

    // Aquí implementarías la lógica para editar el paciente
  };

  const handleDeletePatient = (id) => {
    console.log(`Eliminar paciente con ID: ${id}`);
    // Aquí implementarías la lógica para eliminar el paciente
  };

  const agregarPaciente = () => {
    navigate('/paciente/agregar');
  }

  return (
    <Box sx={{ padding: 3, maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Gestión de Pacientes
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          sx={{ 
            backgroundColor: '#4caf50', 
            '&:hover': { backgroundColor: '#388e3c' } 
          }}
          onClick={agregarPaciente}
        >
          Nuevo Paciente
        </Button>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          backgroundColor: '#f8f9fa'
        }}
      >
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="busqueda-label">Buscar por</InputLabel>
            <Select
              labelId="busqueda-label"
              id="busqueda-select"
              value={busqueda}
              label="Buscar por"
              onChange={handleChangeBusqueda}
            >
              <MenuItem value="nombres">Nombres</MenuItem>
              <MenuItem value="apellidos">Apellidos</MenuItem>
              <MenuItem value="cedula">Cédula</MenuItem>
            </Select>
          </FormControl>
          
          <TextField 
            id="outlined-basic" 
            label="Término de búsqueda"
            variant="outlined" 
            size="small" 
            fullWidth
            onChange={(e) => setfilterBackend(e.target.value)}
          />
          
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento"
              value={fecha}
              onChange={(newValue) => setFecha(newValue)}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider> */}
          
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />}
            onClick={getValuesFilter}
            sx={{ 
              minWidth: '120px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            Buscar
          </Button>
        </Stack>
      </Paper>

      <Paper 
        elevation={3} 
        sx={{ 
          height: 600, 
          width: '100%', 
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <DataGrid
          rows={pacientes}
          columns={columns}
          initialState={{ 
            pagination: { 
              paginationModel: { page: 0, pageSize: 10 } 
            } 
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          loading={loading}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f1f5f9',
              color: '#334155',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e2e8f0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f8fafc',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: '#f1f5f9',
            },
            '& .MuiTablePagination-root': {
              color: '#334155',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default PatientListScreen;