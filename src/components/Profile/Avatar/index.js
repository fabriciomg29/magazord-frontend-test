import styles from './Avatar.module.scss'

export default function Avatar({avatar_url}) {
  return (
    <main>
      <div className={styles.container}>
        <img
          className={styles.avatar}
          src={avatar_url}
        />
        <div className={styles.contentIcon}>
          <img
            className={styles.iconProfileAvatar}
            src='/assets/icon-profile-avatar.svg'
          />
        </div>
      </div>
    </main>
  )
}