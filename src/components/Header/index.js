import styles from './Header.module.scss'

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.items}>
          <img src={'/assets/icon-github.svg'} alt={'Icone github'} />
          <p className={styles.divider}>/</p>
          <p className={styles.profile}>Profile</p>
        </div>
      </div>
    </header>
  )
}

export default Header