import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
// Material UI Icons
import PersonIcon from "@mui/icons-material/Person"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import StraightenIcon from "@mui/icons-material/Straighten";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import OpacityIcon from "@mui/icons-material/Opacity"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"
import WarningIcon from "@mui/icons-material/Warning"
import MedicationIcon from "@mui/icons-material/Medication"
import ShieldIcon from "@mui/icons-material/Shield"
import AssignmentIcon from "@mui/icons-material/Assignment"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import { toast, ToastContainer } from "react-toastify";
import './index.css'

const PatientFormScreen = () => {

  const [initialValues, setInitialValues] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    sexo: "",
    telefono: "",
    direccion: "",
    correo: "",
    tipo_sangre:"",
    altura: "",
    peso: "",
  })
  const [historiaClinica, setHistoriaClinica] = useState({
    antecedentes_familiares: '',
    antecedentes_personales: '',
    alergias: '',
    medicamentos_habituales: '',
    vacunas: '',
  })
  const [hasHistoriaClinica, setHasHistoriaClinica] = useState(false)
  const [editingPersonalData, setEditingPersonalData] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [crearHistoriaClinica, setCrearHistoriaClinica] = useState(false)

  const { id } = useParams()
  const isEditing = Boolean(id)

  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:8000/api/v1/pacientes/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:8000/api/v1/historia-clinica/?paciente=${id}`)
          .then(res2 => res2.json())
          .then(data2 =>{
            if (data2.length > 0){
              setHistoriaClinica(data2[0])
              setHasHistoriaClinica(true)
            }
          })
          .catch(err => console.error(err))

        setInitialValues(data)
      })
      .catch((err) => console.error('Error al cargar paciente:', err));
    }
  }, [id, editingPersonalData])
  const validationSchema = Yup.object({
    cedula: Yup.string(),
    nombres: Yup.string().required("Los nombres son requeridos"),
    apellidos: Yup.string().required("Los apellidos son requeridos"),
    fecha_nacimiento: Yup.date(),
    sexo: Yup.string().oneOf(["M", "F"], "Sexo inválido").nullable(),
    telefono: Yup.string(),
    direccion: Yup.string(),
    correo: Yup.string().email("Correo inválido"),
    tipo_sangre: Yup.string().oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Tipo de sangre inválido").nullable(),
    altura: Yup.number().min(0, "La altura debe ser mayor a 0"),
    peso: Yup.number().min(0, "El peso debe ser mayor a 0"),
  });

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  const onSubmit = (values) => {
    if (!isEditing){
      fetch("http://localhost:8000/api/v1/pacientes/", {
      method: "POST",
        headers: { 
            "Content-Type": "application/json",
            },
        body: JSON.stringify(values),
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la creación del paciente");
            }
            return response.json();   
        })
        .then((data) => {
            console.log("Paciente creado:", data);
            toast.success("Paciente creado exitosamente 🎉");

        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("Error al crear el paciente ❌");
        });
    }
    else{
      fetch(`http://localhost:8000/api/v1/pacientes/${id}/`, {
      method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            },
        body: JSON.stringify(values),
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la actualización del paciente");
            }
            return response.json();   
        })
        .then((data) => {
            console.log("Paciente actualizado:", data);
            setEditingPersonalData(false)
            toast.success("Paciente actualizado exitosamente 🎉");

        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("Error al actualizar el paciente ❌");
        });
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }


  const handleHistoriaClinica = () => {
    if (hasHistoriaClinica){
      fetch(`http://localhost:8000/api/v1/historia-clinica/${historiaClinica.id}/`, {
      method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            },
        body: JSON.stringify(historiaClinica),
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la actualización de la historia clínica");
            }
            return response.json();   
        })
        .then((data) => {
            setEditingPersonalData(false)
            toast.success("Historia clínica actualizada exitosamente 🎉");
        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("Error al actualizar la historia clínica ❌");
        });
    }
    else if (crearHistoriaClinica) {
      let newHistoriaClinica = { ...historiaClinica, paciente : id}

      fetch(`http://localhost:8000/api/v1/historia-clinica/`, {
      method: "POST",
        headers: { 
            "Content-Type": "application/json",
            },
        body: JSON.stringify(newHistoriaClinica),
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la actualización de la historia clínica");
            }
            return response.json();   
        })
        .then((data) => {
            setEditingPersonalData(false)
            toast.success("Historia clínica actualizada exitosamente 🎉");
        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("Error al actualizar la historia clínica ❌");
        });
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleEditPersonalData = () => {
    setEditingPersonalData(true)
  }

  const handleCancelEdit = () => {
    setEditingPersonalData(false)
  }

  const handleCreateHistory = () => {
    setCrearHistoriaClinica(true)

  }

  const handleCancelCreateHistory = () =>{
    setCrearHistoriaClinica(false)
  }

  if (isEditing){
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ width: 64, height: 64, bgcolor: "#1976d2" }}>
                  {initialValues.nombres.charAt(0)}
                  {initialValues.apellidos.charAt(0)}
                </Avatar>
              }
              title={
                <Typography variant="h5" component="div">
                  {initialValues.nombres} {initialValues.apellidos}
                </Typography>
              }
              subheader={
                <Box>
                  <Typography variant="subtitle1">
                    Cédula: {initialValues.cedula} • {calcularEdad(initialValues.fecha_nacimiento)} años
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    <Chip
                      label={initialValues.sexo === "F" ? "Femenino" : "Masculino"}
                      color={initialValues.sexo === "F" ? "secondary" : "default"}
                      size="small"
                    />
                    <Chip icon={<OpacityIcon />} label={initialValues.tipo_sangre} variant="outlined" size="small" />
                  </Box>
                </Box>
              }
              action={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MedicalServicesIcon />}
                    // onClick={handleOpenNewConsulta}
                  >
                    Nueva Consulta
                  </Button>
                </Box>
              }
            />
          </Card>

          {/* Información del Paciente */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Datos Personales */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">Datos Personales</Typography>
                      </Box>
                      {!editingPersonalData ? (
                        <IconButton color="primary" onClick={handleEditPersonalData}>
                          <EditIcon />
                        </IconButton>
                      ) : (
                        <Box>
                          {/* <IconButton color="primary" onClick={handleSavePersonalData}>
                            <SaveIcon />
                          </IconButton> */}
                          <IconButton color="error" onClick={handleCancelEdit}>
                            <CancelIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  }
                />
                <CardContent>
                  {!editingPersonalData ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CalendarTodayIcon color="action" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Fecha de Nacimiento
                          </Typography>
                          <Typography variant="body1">{formatearFecha(initialValues.fecha_nacimiento)}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <PhoneIcon color="action" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Teléfono
                          </Typography>
                          <Typography variant="body1">{initialValues.telefono}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <EmailIcon color="action" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Correo
                          </Typography>
                          <Typography variant="body1">{initialValues.correo}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <LocationOnIcon color="action" sx={{ mt: 0.5 }} />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Dirección
                          </Typography>
                          <Typography variant="body1">{initialValues.direccion}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <OpacityIcon color="action" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Tipo de Sangre
                          </Typography>
                          <Typography variant="body1">{initialValues.tipo_sangre}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <StraightenIcon color="action" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Altura (m)
                          </Typography>
                          <Typography variant="body1">{initialValues.altura}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MonitorWeightIcon color="action" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Peso (Kg)
                          </Typography>
                          <Typography variant="body1">{initialValues.peso}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        enableReinitialize={true}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                        <Form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                          <TextField
                          label="Cédula"
                          name="cedula"
                          value={values.cedula}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.cedula && Boolean(errors.cedula)}
                          helperText={touched.cedula && errors.cedula}
                          fullWidth
                          size="small"
                          />

                          <TextField
                          label="Nombres"
                          name="nombres"
                          value={values.nombres}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.nombres && Boolean(errors.nombres)}
                          helperText={touched.nombres && errors.nombres}
                          fullWidth
                          size="small"
                          />

                          <TextField
                          label="Apellidos"
                          name="apellidos"
                          value={values.apellidos}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.apellidos && Boolean(errors.apellidos)}
                          helperText={touched.apellidos && errors.apellidos}
                          fullWidth
                          size="small"
                          />

                          <TextField
                          label="Fecha de Nacimiento"
                          name="fecha_nacimiento"
                          type="date"
                          value={values.fecha_nacimiento}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.fecha_nacimiento && Boolean(errors.fecha_nacimiento)}
                          helperText={touched.fecha_nacimiento && errors.fecha_nacimiento}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          size="small"
                          />

                          <FormControl fullWidth error={touched.sexo && Boolean(errors.sexo)} size="small">
                          <InputLabel id="sexo-label">Sexo</InputLabel>
                          <Select
                              labelId="sexo-label"
                              id="sexo"
                              name="sexo"
                              value={values.sexo}
                              label="Sexo"
                              onChange={handleChange}
                              onBlur={handleBlur}
                          >
                              <MenuItem value="">
                              <em>Seleccione</em>
                              </MenuItem>
                              <MenuItem value="M">Masculino</MenuItem>
                              <MenuItem value="F">Femenino</MenuItem>
                          </Select>
                          <FormHelperText>{touched.sexo && errors.sexo}</FormHelperText>
                          </FormControl>

                          <TextField
                          label="Teléfono"
                          name="telefono"
                          value={values.telefono}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.telefono && Boolean(errors.telefono)}
                          helperText={touched.telefono && errors.telefono}
                          fullWidth
                          size="small"
                          />

                          <TextField
                          label="Dirección"
                          name="direccion"
                          value={values.direccion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.direccion && Boolean(errors.direccion)}
                          helperText={touched.direccion && errors.direccion}
                          multiline
                          rows={2}
                          fullWidth
                          size="small"
                          />

                          <TextField
                          label="Correo Electrónico"
                          name="correo"
                          type="email"
                          value={values.correo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.correo && Boolean(errors.correo)}
                          helperText={touched.correo && errors.correo}
                          fullWidth
                          size="small"
                          />

                          <FormControl fullWidth error={touched.tipo_sangre && Boolean(errors.tipo_sangre)} size="small">
                          <InputLabel id="tipo-sangre-label">Tipo de sangre</InputLabel>
                          <Select
                              labelId="tipo-sangre-label"
                              id="tipo_sangre"
                              name="tipo_sangre"
                              value={values.tipo_sangre}
                              label="Tipo de sangre"
                              onChange={handleChange}
                              onBlur={handleBlur}
                          >
                              <MenuItem value="">
                              <em>Seleccione</em>
                              </MenuItem>
                              <MenuItem value="O+">O+</MenuItem>
                              <MenuItem value="O-">O-</MenuItem>
                              <MenuItem value="A+">A+</MenuItem>
                              <MenuItem value="A-">A-</MenuItem>
                              <MenuItem value="B+">B+</MenuItem>
                              <MenuItem value="B-">B-</MenuItem>
                              <MenuItem value="AB+">AB+</MenuItem>
                              <MenuItem value="AB-">AB-</MenuItem>
                          </Select>
                          <FormHelperText>{touched.tipo_sangre && errors.tipo_sangre}</FormHelperText>
                          </FormControl>
                          <TextField
                            label="Altura (metros)"
                            name="altura"
                            type="number"
                            inputProps={{ step: "0.01", min: "0" }}
                            value={values.altura}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.altura && Boolean(errors.altura)}
                            helperText={touched.altura && errors.altura}
                            fullWidth
                            size="small"
                          />

                          <TextField
                            label="Peso (kilos)"
                            name="peso"
                            type="number"
                            inputProps={{ step: "0.1", min: "0" }}
                            value={values.peso}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.peso && Boolean(errors.peso)}
                            helperText={touched.peso && errors.peso}
                            fullWidth
                            size="small"
                          />

                          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                          Guardar
                          </Button>
                        </Form>
                        )}
                      </Formik>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Historia Clínica */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DescriptionIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">Historia Clínica</Typography>
                      </Box>
                      {/* {hasHistoriaClinica && (
                        <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                          Editar
                        </Button>
                      )} */}
                      {
                        crearHistoriaClinica && (
                          <IconButton color="error" onClick={handleCancelCreateHistory}>
                            <CancelIcon />
                          </IconButton>
                        )
                      }
                    </Box>
                  }
                />
                <CardContent>
                  {hasHistoriaClinica || crearHistoriaClinica ? (
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="historia clinica tabs">
                          <Tab label="Antecedentes" />
                          <Tab label="Alergias" />
                          <Tab label="Medicamentos" />
                          <Tab label="Vacunas" />
                        </Tabs>
                      </Box>
                      <Box sx={{ p: 2 }}>
                        {tabValue === 0 && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                              Antecedentes Familiares
                            </Typography>
                            <TextField
                              fullWidth
                              multiline
                              value={historiaClinica.antecedentes_familiares}
                              size="small"
                              onChange={(e) => setHistoriaClinica({ ...historiaClinica, antecedentes_familiares: e.target.value })}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                              Antecedentes Personales
                            </Typography>
                            <TextField
                              fullWidth
                              multiline
                              value={historiaClinica.antecedentes_personales}
                              size="small"
                              onChange={(e) => setHistoriaClinica({ ...historiaClinica, antecedentes_personales: e.target.value })}
                            />
                          </Box>
                        )}
                        {tabValue === 1 && (
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                            <WarningIcon color="error" />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Alergias Conocidas
                              </Typography>
                              <TextField
                                fullWidth
                                multiline
                                value={historiaClinica.alergias}
                                size="small"
                                onChange={(e) => setHistoriaClinica({ ...historiaClinica, alergias: e.target.value })}
                              />
                            </Box>
                          </Box>
                        )}
                        {tabValue === 2 && (
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                            <MedicationIcon color="primary" />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Medicamentos Habituales
                              </Typography>
                              <TextField
                                fullWidth
                                multiline
                                value={historiaClinica.medicamentos_habituales}
                                size="small"
                                onChange={(e) => setHistoriaClinica({ ...historiaClinica, medicamentos_habituales: e.target.value })}
                              />
                            </Box>
                          </Box>
                        )}
                        {tabValue === 3 && (
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                            <ShieldIcon color="success" />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Vacunas
                              </Typography>
                              <TextField
                                fullWidth
                                multiline
                                value={historiaClinica.vacunas}
                                size="small"
                                onChange={(e) => setHistoriaClinica({ ...historiaClinica, vacunas: e.target.value })}
                              />
                            </Box>
                          </Box>
                        )}
                        <Box sx={{ mt: 4, display: "flex"}}>
                          <Button variant="contained" onClick={handleHistoriaClinica}>
                            Guardar cambios
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <DescriptionIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        No hay historia clínica
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Este paciente no tiene una historia clínica registrada.
                      </Typography>
                      <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateHistory} >
                        Crear Historia Clínica
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

      </Box>
    )
  }
  else{
      return (
    <div className="pacienteScreen">
      <h3 className="historia">Datos personales</h3>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
       >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                
                <TextField
                label="Cédula"
                name="cedula"
                value={values.cedula}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cedula && Boolean(errors.cedula)}
                helperText={touched.cedula && errors.cedula}
                fullWidth
                />

                <TextField
                label="Nombres"
                name="nombres"
                value={values.nombres}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.nombres && Boolean(errors.nombres)}
                helperText={touched.nombres && errors.nombres}
                fullWidth
                />

                <TextField
                label="Apellidos"
                name="apellidos"
                value={values.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.apellidos && Boolean(errors.apellidos)}
                helperText={touched.apellidos && errors.apellidos}
                fullWidth
                />

                <TextField
                label="Fecha de Nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={values.fecha_nacimiento}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fecha_nacimiento && Boolean(errors.fecha_nacimiento)}
                helperText={touched.fecha_nacimiento && errors.fecha_nacimiento}
                InputLabelProps={{ shrink: true }}
                fullWidth
                />

                <FormControl fullWidth error={touched.sexo && Boolean(errors.sexo)}>
                <InputLabel id="sexo-label">Sexo</InputLabel>
                <Select
                    labelId="sexo-label"
                    id="sexo"
                    name="sexo"
                    value={values.sexo}
                    label="Sexo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <MenuItem value="">
                    <em>Seleccione</em>
                    </MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                </Select>
                <FormHelperText>{touched.sexo && errors.sexo}</FormHelperText>
                </FormControl>

                <TextField
                label="Teléfono"
                name="telefono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.telefono && Boolean(errors.telefono)}
                helperText={touched.telefono && errors.telefono}
                fullWidth
                />

                <TextField
                label="Dirección"
                name="direccion"
                value={values.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.direccion && Boolean(errors.direccion)}
                helperText={touched.direccion && errors.direccion}
                multiline
                rows={2}
                fullWidth
                />

                <TextField
                label="Correo Electrónico"
                name="correo"
                type="email"
                value={values.correo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.correo && Boolean(errors.correo)}
                helperText={touched.correo && errors.correo}
                fullWidth
                />

                <FormControl fullWidth error={touched.tipo_sangre && Boolean(errors.tipo_sangre)}>
                <InputLabel id="tipo-sangre-label">Tipo de sangre</InputLabel>
                <Select
                    labelId="tipo-sangre-label"
                    id="tipo-sangre"
                    name="tipo-sangre"
                    value={values.tipo_sangre}
                    label="Tipo de sangre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <MenuItem value="">
                    <em>Seleccione</em>
                    </MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                </Select>
                <FormHelperText>{touched.tipo_sangre && errors.tipo_sangre}</FormHelperText>
                </FormControl>
                <TextField
                label="Altura (metros)"
                name="altura"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={values.altura}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.altura && Boolean(errors.altura)}
                helperText={touched.altura && errors.altura}
                fullWidth
                size="small"
              />
              <TextField
                label="Peso (kilos)"
                name="peso"
                type="number"
                inputProps={{ step: "0.1", min: "0" }}
                value={values.peso}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.peso && Boolean(errors.peso)}
                helperText={touched.peso && errors.peso}
                fullWidth
                size="small"
              />
                {
                  isEditing && 
                    <Button variant="outlined">
                      Nueva consulta médica
                    </Button>
                }
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Guardar
                </Button>
            </Form>
        )}
      </Formik>
    </div>
  );
  }  
};

export default PatientFormScreen;