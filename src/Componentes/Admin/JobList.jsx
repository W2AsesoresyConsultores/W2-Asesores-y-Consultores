import React, { useContext, useState, useEffect } from 'react';
import {
  LinearProgress, Select, MenuItem, IconButton, Tooltip, TablePagination
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaDollarSign } from 'react-icons/fa';
import { FaLocationDot, FaBuildingUser } from "react-icons/fa6";
import EditIcon from "@mui/icons-material/Edit";
import JobsContext from '../../Context/JobsContext';
import { supabase } from '../../supabase/supabase.config';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const JobList = () => {
  const { userSearchResults: jobs, setJobs, userId } = useContext(JobsContext); // Asegúrate de tener userId
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Oferta')
        .select('*')
        .eq('user_id', userId); // Filtra por el ID de usuario

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [setJobs, userId]);

  const handleChangeStatus = async (index, newStatus) => {
    setLoading(true);
    const jobToUpdate = jobs[index];

    const { error } = await supabase
      .from('Oferta')
      .update({ estado: newStatus })
      .eq('id_oferta', jobToUpdate.id_oferta);

    if (error) {
      console.error('Error updating job status:', error);
    } else {
      const updatedJobs = [...jobs];
      updatedJobs[index].estado = newStatus;
      setJobs(updatedJobs);
    }
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full bg-transparent px-6 pb-6 rounded-lg font-dmsans">
      {loading ? (
        <div className="flex pt-40 justify-center h-screen">
          <div className="w-3/4 md:w-1/2">
            <LinearProgress 
              sx={{
                width: '80%',
                backgroundColor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#2563eb',
                }
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, index) => (
                <div
                  key={job.id_oferta}
                  className="bg-white dark:bg-[#1c252e] rounded-xl dark:border-none border border-[#e2e8f0] shadow-sm p-6 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                        <img
                          src={job.empresa_img_url}
                          alt="profile"
                          className="w-12 h-12 rounded-lg"
                        />
                      </div>
                      <Link to={`/EditJob/${job.id_oferta}`}>
                        <Tooltip title="Editar">
                          <IconButton
                            color="primary"
                            sx={{
                              "&:hover": { color: "gray" },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </div>
                  </div>
                  <div className="mb-2">
                    <Link to={`/Postulados/${job.id_oferta}`}>
                      <h3 className="text-md font-medium hover:underline">{job.puesto}</h3>
                    </Link>
                    <p className="text-xs text-gray-500">
                      Publicado: {formatDate(job.fecha_publicacion)}
                    </p>
                  </div>
                  <div className="text-[#00a76f] font-medium text-xs mb-2 flex items-center gap-2">
                    <FaUserFriends />
                    <p className="">{job.count_postulados} candidatos</p>
                  </div>
                  <hr className="mb-2 border-t-2 border-gray-300 dark:border-gray-800 border-dotted" />

                  <div className="text-gray-500 grid grid-cols-3 gap-4 mb-4 text-xs font-light">
                    <div className="flex items-center gap-2">
                      <FaLocationDot />
                      <p>{job.ubicacion}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBuildingUser />
                      <p>{job.modalidad}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaDollarSign />
                      <p>{job.sueldo}</p>
                    </div>
                  </div>
                  <div className="flex justify-end w-full">
                    <Select
                      value={job.estado}
                      onChange={(e) => handleChangeStatus(index, e.target.value)}
                      sx={{
                        width: 120,
                        color: job.estado === "activa" ? "green" : "red",
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: job.estado === "activa" ? "green" : "red",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: job.estado === "activa" ? "darkgreen" : "darkred",
                        },
                        ".MuiSvgIcon-root": {
                          color: job.estado === "activa" ? "green" : "red",
                        },
                      }}
                    >
                      <MenuItem value="activa">Abierto</MenuItem>
                      <MenuItem value="cerrada">Cerrado</MenuItem>
                    </Select>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No se encontraron trabajos</p>
            )}
          </div>
          <TablePagination
            rowsPerPageOptions={[9]}
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`} // Custom label
          />
        </>
      )}
    </div>
  );
};

export default JobList;