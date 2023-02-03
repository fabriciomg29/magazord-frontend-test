import { useContext, useEffect, useRef, useState } from "react"
import styles from './Profile.module.scss'
import Avatar from './Avatar'
import Item from './Item'
import { DataContext } from "../Main"

const Profile = () => {

  const { user } = useContext(DataContext)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [showInfo, setShowInfo] = useState(0)

  const {
    avatar_url,
    name,
    bio,
    company,
    location,
    blog,
    twitter_username
  } = user

  const getDescription = (field) => (!!field) ? field : ' Não informado. '
  const handleClickInfo = () => setShowInfo(state => !state)
  const getClassArrow = (showInfo ? styles.arrowUp : styles.arrowDown)

  useEffect(() => {
    setShowInfo(windowSize > 672)
  }, [windowSize])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.container}>

      <Avatar avatar_url={avatar_url} />

      <span className={styles.name}>
        {name}
      </span>

      <div className={styles.containerDescription}>
        <span className={styles.description}>
          {bio}
        </span>
      </div>

      <div
        className={styles.containerInfo}
        onClick={handleClickInfo}
      >
        <span className={styles.info}>
          Informações Adicionais
        </span>
        <img className={getClassArrow} src={'/assets/icon-arrow-up.svg'} alt={'ícone flexa'} />
      </div>

      {showInfo && (
        <div className={styles.contentInfo}>
          <Item image={'icon-company'} alt={'icon company'}>
            {getDescription(company)}
          </Item>
          <Item image={'icon-location'} alt={'icon localização'}>
            {getDescription(location)}
          </Item>
          <Item image={'icon-link'} alt={'icone link'}>
            {getDescription(blog)}
          </Item>
          <Item image={'icon-social'} alt={'icone social'}>
            {getDescription(twitter_username)}
          </Item>
        </div>
      )}
    </div>
  )
}

export default Profile