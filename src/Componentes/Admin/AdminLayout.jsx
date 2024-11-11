import React, { useContext } from "react";
import BtnContainer from "./BtnContainer";
import JobList from "./JobList";
import { UserAuth } from "../../Context/AuthContext";
import BuscadorJob from "./BuscadorJob";
import Postulados from "./Postulados";
import HeaderDashboard from "./HeaderDashboard";
import { ThemeContext } from "../../Context/ThemeContext"; 

function AdminLayout() {
  const { user, signOut } = UserAuth();

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fafbff] dark:bg-[#141a21] dark:text-white pl-72 pr-10 pt-20">
      <HeaderDashboard />
      <JobList />
    </div>
  );
}

export default AdminLayout;
