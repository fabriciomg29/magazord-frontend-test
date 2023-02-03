import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../Main"
import styles from './Starreds.module.scss'

export default function Starreds({ filters }) {

  const { starreds } = useContext(DataContext)
  const [list, setList] = useState([])
  const { types, languages } = filters

  const handleSearch = (starred) => {
    if (filters.search) {
      const res = starred.full_name.toLowerCase().search(filters.search.toLowerCase()) > -1
      return res
    }
    return true
  }

  const repoTypesFilter = async (filtered) => {
    for (let i = 1; i < types.length; i++) {
      if (types[i].checked) {
        const founRepos = starreds.filter(starred => (starred[types[i].id] === true))
        founRepos.map(starred => filtered.set(starred.id, starred))
      }
    }
  }

  const repoLanguageFilter = async (filtered) => {
    for (let i = 1; i < languages.length; i++) {
      if (languages[i].checked) {
        const finder = starreds.filter(starred => starred.language === languages[i].name)
        finder.map(starred => filtered.set(starred.id, starred))
      }
    }
  }

  const handleFilter = async () => {

    if (filters.search) {
      const currentStared = starreds.filter(starred => handleSearch(starred))
      setList(currentStared)
      return
    }

    const filtered = new Map();

    if (types[0].checked || languages[0].checked) {
      setList(starreds)
    } else {

      await repoTypesFilter(filtered)
      await repoLanguageFilter(filtered)

      let itensFiltered = Array.from(filtered, ([name, value]) => value);
      setList(itensFiltered)
    }
  }

  useEffect(() => {

    const getFilter = async () => {
      await handleFilter()
    }

    getFilter()

  }, [filters])

  return (
    <article>
      {list
        .map(starred => {

          const [name, starredName] = starred.full_name.split('/')

          return (
            <section key={starred.id}>
              <div className={styles.container}>
                <a href={starred.html_url} className={styles.link} target="_blank">
                  <span className={styles.title}>
                    {name} /
                    <span className={styles.name}>
                      &nbsp;{starredName}
                    </span>
                  </span>
                </a>
                <p className={styles.description}>
                  {starred.description}
                </p>
                <div className={styles.footer}>
                  <div className={styles.fork}>
                    {starred.language}
                  </div>
                  <div className={styles.fork}>
                    <img src={'/assets/icon-fork.svg'} alt={'ícone fork'} />
                    <span>
                      {starred.forks_count}
                    </span>
                  </div>
                </div>
              </div>

              <hr />

            </section>
          )
        })}
    </article>
  )
}