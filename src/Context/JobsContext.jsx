import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase.config'; 
import { UserAuth } from '../Context/AuthContext';

const JobsContext = createContext();

const removeAccents = (str) => {
  return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
};

export const JobsProvider = ({ children }) => {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [allActiveJobs, setAllActiveJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    if (!user) return;

    const { data: profileData, error: profileError } = await supabase
      .from('perfiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return;
    }

    const idReclutador = profileData.id;

    const { data, error } = await supabase
      .from('Oferta')
      .select('*')
      .eq('id_reclutador', idReclutador)
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      const validJobs = data.filter((job) => job.puesto !== undefined && job.puesto !== null);
      setJobs(validJobs);
      setUserSearchResults(validJobs);
    }
  };

  const fetchAllActiveJobs = async () => {
    const { data, error } = await supabase
      .from('Oferta')
      .select('*')
      .eq('estado', 'activa')
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      console.error('Error fetching all active jobs:', error);
    } else {
      setAllActiveJobs(data);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAllActiveJobs();

    const subscription = supabase
      .channel('jobs-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Oferta' }, (payload) => {
        const newJob = payload.new;
        if (newJob.id_reclutador === user.id) {
          setJobs((prevJobs) => [...prevJobs, newJob]);
          setUserSearchResults((prevResults) => [...prevResults, newJob]);
        }
        if (newJob.estado === 'activa') {
          setAllActiveJobs((prevJobs) => [...prevJobs, newJob]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  useEffect(() => {
    const filteredJobs = jobs.filter(job =>
      removeAccents(job.puesto.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
    );
    setUserSearchResults(filteredJobs);
  }, [searchTerm, jobs]);

  const searchJobs = async (keyword, location) => {
    const { data, error } = await supabase
      .from('Oferta')
      .select('*')
      .ilike('puesto', `%${keyword}%`)
      .ilike('ubicacion', `%${location}%`)
      .eq('estado', 'activa');

    if (error) {
      console.error('Error searching jobs:', error);
    } else {
      setUserSearchResults(data);
    }
  };

  const resetSearchResults = () => {
    setUserSearchResults(jobs);
  };

  const deleteJob = async (id_oferta) => {
    const { error } = await supabase
      .from('Oferta')
      .delete()
      .eq('id_oferta', id_oferta);

    if (error) {
      console.error('Error deleting job:', error);
    } else {
      setJobs(prevJobs => prevJobs.filter(job => job.id_oferta !== id_oferta));
      setUserSearchResults(prevResults => prevResults.filter(job => job.id_oferta !== id_oferta));
      setAllActiveJobs(prevJobs => prevJobs.filter(job => job.id_oferta !== id_oferta));
    }
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      setJobs,
      searchJobs,
      userSearchResults,
      resetSearchResults,
      searchTerm,
      setSearchTerm,
      deleteJob,
      fetchJobs,
      allActiveJobs, // Expose the new state
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export default JobsContext;