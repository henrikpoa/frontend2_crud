import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            Blog <span>Uniasslevi</span> ADS
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to='/' className={({isActive}) => (isActive ? styles.active : '')}>
                    Home
                </NavLink>                
            </li>
           {/*  <li>
            <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : '')}>
                    Criar Usuário
                </NavLink>
            </li>
            <li>
            <NavLink to='/updateuser' className={({isActive}) => (isActive ? styles.active : '')}>
                    Atualizar Usuário
                </NavLink>
            </li>
            <li>
            <NavLink to='/deleteuser' className={({isActive}) => (isActive ? styles.active : '')}>
                    Excluir Usuário
                </NavLink>
            </li> */}
            <li>
            <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : '')}>
                    About
                </NavLink>
            </li>
        </ul>
    </nav>;
  
};

export default Navbar;