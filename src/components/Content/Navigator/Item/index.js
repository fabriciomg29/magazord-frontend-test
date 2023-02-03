import styles from './Item.module.scss'

export default function Item(props) {

  const { image, alt, name, counter, selected } = props

  const status = (selected) ? 'enable' : 'disabled'
  const otherClass = (selected) ? styles.enable : styles.disabled

  const handlerClick = (name) => {
    props.handleClick(name)
  }

  return (
    <span className={`${styles.container} ${otherClass}`} onClick={() => handlerClick(name)}>
      <img src={`/assets/icon-${image}-${status}.svg`} alt={alt} />
      <p className={styles.name}>
        {name}
      </p>
      <div className={styles.counter}>
        <span className={styles.counterNumber}>{counter}</span>
      </div>
    </span>
  )
}