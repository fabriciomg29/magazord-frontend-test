import styles from './Item.module.scss'

export default function Item(props) {
  return (
    <div className={styles.contentList}>
      <img
        className={styles.iconList}
        src={`/assets/${props.image}.svg`}
        alt={`${props.alt}`}
      />
      {props.children}
    </div>
  )
}