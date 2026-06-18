import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Typography, Box, Alert } from '@mui/material';
import StatsCommandesParMenu from '../../components/StatsCommandesParMenu';

const StatsAdminPage = () => {
  const { user, isAdmin } = useAuth();

  if (user && !isAdmin()) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Accès non autorisé — Admin uniquement</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Tableau de bord — Statistiques</Typography>
        <Typography variant="body2" color="text.secondary">
          Nombre de commandes et chiffre d'affaires par menu (données issues de MongoDB).
        </Typography>
      </Box>
      <StatsCommandesParMenu />
    </Container>
  );
};

export default StatsAdminPage;
