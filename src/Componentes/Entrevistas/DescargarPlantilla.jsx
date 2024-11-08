import React from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

function DescargarPlantilla() {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      component="a"
      href="/Plantilla.xlsx"
      download="Plantilla.xlsx"
    >
      Plantilla
    </Button>
  );
}

export default DescargarPlantilla;