import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div class="sidebar" data-image="../assets/img/sidebar-5.jpg">
           
            <div class="sidebar-wrapper">
                <div class="logo">
                    <Link to="http://www.creative-tim.com" class="simple-text">
                        Creative Tim
                    </Link>
                </div>
                <ul class="nav">
                    <li class="nav-item active">
                        <Link class="nav-link" to="dashboard.html">
                            <i class="nc-icon nc-chart-pie-35"></i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-link" to="./user.html">
                            <i class="nc-icon nc-circle-09"></i>
                            <p>User Profile</p>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-link" to="./table.html">
                            <i class="nc-icon nc-notes"></i>
                            <p>Table List</p>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-link" to="./typography.html">
                            <i class="nc-icon nc-paper-2"></i>
                            <p>Typography</p>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-link" to="./icons.html">
                            <i class="nc-icon nc-atom"></i>
                            <p>Icons</p>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-link" to="./maps.html">
                            <i class="nc-icon nc-pin-3"></i>
                            <p>Maps</p>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-link" to="./notifications.html">
                            <i class="nc-icon nc-bell-55"></i>
                            <p>Notifications</p>
                        </Link>
                    </li>
                    <li class="nav-item active active-pro">
                        <Link class="nav-link active" to="upgrade.html">
                            <i class="nc-icon nc-alien-33"></i>
                            <p>Upgrade to PRO</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
  )
}
