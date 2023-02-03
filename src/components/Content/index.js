import { useContext, useEffect, useState } from 'react'
import { DataContext } from "../Main"
import styles from './Content.module.scss'
import Navigator from './Navigator'
import Repositories from './Repositories'
import Search from './Search'
import Starreds from './Starreds'

const Content = () => {

  const { repos } = useContext(DataContext)

  const [data, setData] = useState(null)

  useEffect(() => {
    return () => {
      const languages = [...new Set(repos.map(repo => repo.language))];
      const newLanguages = languages.filter(desc => !!desc).map(desc => ({
        'id': desc.toLowerCase(),
        'name': desc,
        'checked': false
      }))

      setData({
        menu: 'Repositories',
        filters: {
          search: '',
          types: [
            {id: 'all', name:'All', checked: true},
            {id: 'sources', name:'Sources', checked: false},
            {id: 'fork', name:'Fork', checked: false},
            {id: 'archived', name:'Archived', checked: false},
            {id: 'mirrors', name:'Mirrors', checked: false}
          ],
          languages: [
            {id: 'all', name:'All', checked: true},
            ...newLanguages
          ]
        }
      })
    }
  }, [])

  return (
    <div className={styles.container}>

      {data && (
        <>
          <Navigator data={data} setData={setData} />

          <Search data={data} setData={setData} />

          {data.menu === 'Repositories' && (<Repositories filters={data.filters} />)}
          {data.menu === 'Starred' && (<Starreds filters={data.filters} />)}
        </>
      )}

    </div>
  )
}

export default Content