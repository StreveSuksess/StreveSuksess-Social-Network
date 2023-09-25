import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <a href="https://t.me/strevesuksess" className={styles.logo}>
          <span className={styles.s}>S</span>
          <span className={styles.treve}>treve</span>
          <span className={styles.s}>S</span>
          <span className={styles.uksess}>uksess</span>
        </a>
      </div>
    </header>
  );
}

export default Header;