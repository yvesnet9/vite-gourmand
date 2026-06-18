import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Card, CardContent, Typography, Box, FormControl, InputLabel,
  Select, MenuItem, TextField, Button, CircularProgress, Alert, Stack
} from '@mui/material';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsCommandesParMenu() {
  const [data, setData] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [menuId, setMenuId] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async (params = {}, updateMenus = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/admin/stats/commandes-par-menu', { params });
      setData(res.data);
      if (updateMenus) {
        setAllMenus(res.data.map((d) => ({ id: d.menu_id, titre: d.menu_titre })));
      }
    } catch (e) {
      setError("Impossible de charger les statistiques.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData({}, true); }, []);

  const handleFilter = () => {
    const params = {};
    if (menuId) params.menu_id = menuId;
    if (dateDebut) params.date_debut = dateDebut;
    if (dateFin) params.date_fin = dateFin;
    fetchData(params);
  };

  const handleReset = () => {
    setMenuId(''); setDateDebut(''); setDateFin('');
    fetchData({});
  };

  const chartData = {
    labels: data.map((d) => d.menu_titre),
    datasets: [
      {
        label: 'Nb de commandes',
        data: data.map((d) => d.nb_commandes),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        yAxisID: 'y',
      },
      {
        label: "Chiffre d'affaires (€)",
        data: data.map((d) => d.chiffre_affaires),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Commandes et chiffre d\'affaires par menu' },
    },
    scales: {
      y: { type: 'linear', position: 'left', beginAtZero: true,
           title: { display: true, text: 'Nb de commandes' } },
      y1: { type: 'linear', position: 'right', beginAtZero: true,
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'CA (€)' } },
    },
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Statistiques des commandes par menu
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Menu</InputLabel>
            <Select label="Menu" value={menuId} onChange={(e) => setMenuId(e.target.value)}>
              <MenuItem value="">Tous les menus</MenuItem>
              {allMenus.map((m) => (
                <MenuItem key={m.id} value={m.id}>{m.titre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Du" type="date" size="small"
            InputLabelProps={{ shrink: true }}
            value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
          <TextField label="Au" type="date" size="small"
            InputLabelProps={{ shrink: true }}
            value={dateFin} onChange={(e) => setDateFin(e.target.value)} />

          <Button variant="contained" onClick={handleFilter}>Filtrer</Button>
          <Button variant="outlined" onClick={handleReset}>Réinitialiser</Button>
        </Stack>

        {loading && <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && data.length === 0 && (
          <Typography color="text.secondary">Aucune donnée pour ces filtres.</Typography>
        )}
        {!loading && !error && data.length > 0 && (
          <Box sx={{ position: 'relative', height: 380 }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
