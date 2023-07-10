import React from 'react'
import { Link } from 'react-router-dom'
export const DeveloperNavbar = () => {

    const logoutOnClick=(e)=>{
        localStorage.clear();
    }


  return (
    <nav class="navbar navbar-expand-lg " color-on-scroll="500">
    <div class="container-fluid">
        <p class="navbar-brand" to="#pablo"> Dashboard </p>
        {/* <button href="" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
        </button> */}
        <div class="collapse navbar-collapse justify-content-end" id="navigation">
            {/* <ul class="nav navbar-nav mr-auto">
                <li class="nav-item">
                    <Link to="#" class="nav-link" data-toggle="dropdown">
                        <i class="nc-icon nc-palette"></i>
                        <span class="d-lg-none">Dashboard</span>
                    </Link>
                </li>
                <li class="dropdown nav-item">
                    <Link to="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i class="nc-icon nc-planet"></i>
                        <span class="notification">5</span>
                        <span class="d-lg-none">Notification</span>
                    </Link>
                    <ul class="dropdown-menu">
                        <Link class="dropdown-item" to="#">Notification 1</Link>
                        <Link class="dropdown-item" to="#">Notification 2</Link>
                        <Link class="dropdown-item" to="#">Notification 3</Link>
                        <Link class="dropdown-item" to="#">Notification 4</Link>
                        <Link class="dropdown-item" to="#">Another notification</Link>
                    </ul>
                </li>
                <li class="nav-item">
                    <Link to="#" class="nav-link">
                        <i class="nc-icon nc-zoom-split"></i>
                        <span class="d-lg-block">&nbsp;Search</span>
                    </Link>
                </li>
            </ul> */}
            <ul class="navbar-nav ml-auto">
                {/* <li class="nav-item">
                    <Link class="nav-link" to="#pablo">
                        <span class="no-icon">Account</span>
                    </Link>
                </li>
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="no-icon">Dropdown</span>
                    </Link>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link class="dropdown-item" to="#">Action</Link>
                        <Link class="dropdown-item" to="#">Another action</Link>
                        <Link class="dropdown-item" to="#">Something</Link>
                        <Link class="dropdown-item" to="#">Something else here</Link>
                        <div class="divider"></div>
                        <Link class="dropdown-item" to="#">Separated link</Link>
                    </div>
                </li> */}
                <li class="nav-item">
                    <Link class="nav-link" onClick={(e)=>{logoutOnClick(e)}} to={'/'}>
                        <span class="no-icon">Log out</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</nav>

  )
}
