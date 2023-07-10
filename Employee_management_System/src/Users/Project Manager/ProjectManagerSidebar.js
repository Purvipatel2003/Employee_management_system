import React from 'react'
import { Link } from 'react-router-dom'
export const ProjectManagerSidebar = () => {
  return (
    <div class="sidebar" data-image="../assets/img/sidebar-5.jpg">
           
    <div class="sidebar-wrapper">
        <div class="logo">
            <Link to="#" class="simple-text">
                ProjectManager Dashboard
            </Link>
        </div>
        <ul class="nav">
            <li class="nav-item">
                <Link class="nav-link"  to="ProjectTable">
                    <i class="nc-icon nc-notes"></i>
                    <p>Project List</p>
                </Link>
            </li>

            <li>
                <Link class="nav-link" to="UserProfile">
                    <i class="nc-icon nc-badge"></i>
                    <p>User Profile</p>
                </Link>
            </li>
            {/* <li>
                <Link class="nav-link" to="AddProject">
                    <i class="nc-icon nc-circle-09"></i>
                    <p>Add Project</p>
                </Link>
            </li> */}
            <li>
                <Link class="nav-link" to="UserTable">
                    <i class="nc-icon nc-circle-09"></i>
                    <p>Users</p>
                </Link>
            </li>
            {/* <li>
                <Link class="nav-link" to="Project_ModuleTable">
                    <i class="nc-icon nc-paper-2"></i>
                    <p>Project_Module</p>
                </Link>
            </li> */}
            {/* <li>
                <Link class="nav-link" to="TaskTable">
                    <i class="nc-icon nc-atom"></i>
                    <p>Tasks</p>
                </Link>
            </li> */}
            {/* <li>
                <Link class="nav-link" to="StatusTable">
                    <i class="nc-icon nc-pin-3"></i>
                    <p>Status</p>
                </Link>
            </li> */}
            {/* <li>
                <Link class="nav-link" to="RoleTable">
                    <i class="nc-icon nc-bell-55"></i>
                    <p>Roles</p>
                </Link>
            </li> */}

            <li>
                <Link class="nav-link" to="Project_TeamTable">
                    <i class="nc-icon nc-single-02"></i>
                    <p>Project_Team</p>
                </Link>
            </li>

            
            <li>
                <Link class="nav-link" to="User_TaskTable">
                    <i class="nc-icon nc-paper-2"></i>
                    <p>User_Task</p>
                </Link>
            </li>
           
            {/* <li class="nav-item active active-pro">
                <Link class="nav-link active" to="upgrade.html">
                    <i class="nc-icon nc-alien-33"></i>
                    <p>Upgrade to PRO</p>
                </Link>
            </li> */}
        </ul>
    </div>
</div>

  )
}
