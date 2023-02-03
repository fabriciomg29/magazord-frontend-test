import { useContext, useState } from "react"
import { DataContext } from "../../Main"
import styles from './Navigator.module.scss'
import Item from "./Item";

export default function Navigator({ data, setData }) {

  const { starreds, repos } = useContext(DataContext)

  const [selected, setSelected] = useState(data.menu)

  const handleClick = (menu) => {
    setSelected(menu)
    setData(data => ({
      ...data,
      'menu': menu
    }))
  }

  return (
    <nav className={styles.container}>
      <Item
        image="repositories"
        name="Repositories"
        alt="ícone de repositórios"
        counter={repos.length}
        selected={selected === 'Repositories'}
        handleClick={handleClick}
      />

      <Item
        image="starred"
        name="Starred"
        alt="ícone das starreds"
        counter={starreds.length}
        selected={selected === 'Starred'}
        handleClick={handleClick}
      />
    </nav>
  )
}