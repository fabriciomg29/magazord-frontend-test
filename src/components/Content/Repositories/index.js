import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../Main"
import styles from './Repository.module.scss'

export default function Repositories({filters}) {

  const { repos } = useContext(DataContext)
  const [list, setList] = useState([])
  const { types, languages } = filters

  const handleSearch = (repo) => {
    if (filters.search) {
      const res = repo.full_name.toLowerCase().search(filters.search.toLowerCase()) > -1
      return res
    }
    return true
  }

  const repoTypesFilter = async (filtered) => {
    for (let i = 1; i < types.length; i++) {
      if (types[i].checked) {
        const founRepos = repos.filter(repo => (repo[types[i].id] === true))
        founRepos.map(repo => filtered.set(repo.id, repo))
      }
    }
  }

  const repoLanguageFilter = async (filtered) => {
    for (let i = 1; i < languages.length; i++) {
      if (languages[i].checked) {
        const finder = repos.filter(repo => repo.language === languages[i].name)
        finder.map(repo => filtered.set(repo.id, repo))
      }
    }
  }

  const handleFilter = async () => {

    if(filters.search) {
      const currentRepos = repos.filter(repo => handleSearch(repo))
      setList(currentRepos)
      return
    }

    const filtered = new Map();

    if (types[0].checked || languages[0].checked) {
      setList(repos)
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
        .map(repo => {

          const [name, repoName] = repo.full_name.split('/')

          return (
            <section key={repo.id}>
              <div className={styles.container}>
                <a href={repo.clone_url} className={styles.link} target="_blank">
                  <span className={styles.title}>
                    {name} /
                    <span className={styles.name}>
                      &nbsp;{repoName}
                    </span>
                  </span>
                </a>
                <p className={styles.description}>
                  {repo.description}
                </p>
                <div className={styles.footer}>
                  <div className={styles.fork}>
                    <img src={'/assets/icon-repo-starred.svg'} alt={'ícone starred'} />
                    <span>
                      {repo.forks_count}
                    </span>
                  </div>
                  <div className={styles.fork}>
                    <img src={'/assets/icon-fork.svg'} alt={'ícone fork'} />
                    <span>
                      {repo.forks_count}
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