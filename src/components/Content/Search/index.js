import { useState } from 'react'
import styles from './Search.module.scss'

const Search = ({ data, setData }) => {

  const { languages, types } = data.filters

  const [search, setSearch] = useState('')
  const [showLanguage, setShowLanguage] = useState(false)
  const [showType, setShowType] = useState(false)

  const handleChangeStateLanguage = (e) => {

    const { id } = e.target

    const filtered = { ...data.filters }

    const currentIdx = filtered.languages.findIndex(language => language.id === id)
    filtered.languages[currentIdx].checked = !filtered.languages[currentIdx].checked

    setData(state => ({
      ...state,
      'filters': filtered
    }))

  }

  const handleChangeStateType = (e) => {

    const { id } = e.target

    const filtered = { ...data.filters }

    const currentIdx = filtered.types.findIndex(type => type.id === id)
    filtered.types[currentIdx].checked = !filtered.types[currentIdx].checked

    setData(state => ({
      ...state,
      'filters': filtered
    }))

  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = (type) => {
    if (type === 'language') {
      setShowLanguage(state => !state)
      setShowType(false)
    }
    if (type === 'type') {
      setShowType(state => !state)
      setShowLanguage(false)
    }
  }

  const setValueFilter = (value = '') => {
    const newFilter = { ...data.filters }
    newFilter.search = value

    setData(data => ({
      ...data,
      filters: newFilter
    }))
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setValueFilter(search)
    } else {
      if (e.target.value === '') {
        setValueFilter()
      }
    }
  }

  const handleHideOptions = () => {
    setShowType(false)
    setShowLanguage(false)
  }

  return (
    <>
      {(showType || showLanguage) && (
        <div className={styles.mask} onClick={handleHideOptions}></div>
      )}
      <div className={styles.container}>

        <div className={styles.searchContainer}>
          <img src={`/assets/icon-search.svg`} alt={"icone de pesquisa"} />
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            autoFocus
            onChange={handleChange}
            onKeyUp={handleKeyPress}
          />
        </div>

        <div className={styles.buttonContainer}>
          <div>
            <span onClick={() => handleClick('type')} className={styles.buttonOption}>
              <img src={`/assets/icon-checked.svg`} alt={"icone checked"} />
              <span
                className={styles.buttonText}
              >
                Type
              </span>
            </span>
            {showType && (
              <div className={styles.listaLanguage}>
                <ul>
                  {types.map(type => (
                    <li className={styles.itemLista} key={type.id}>
                      <div className={styles.containerItemLista}>
                        <input
                          type="checkbox"
                          id={type.id}
                          onChange={handleChangeStateType}
                          checked={type.checked}
                          className={styles.inputItemLista}
                        />
                        <label htmlFor={type.id} className={styles.labelItemLista}>
                          {type.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <span onClick={() => handleClick('language')} className={styles.buttonOption}>
              <img src={`/assets/icon-checked.svg`} alt={"icone checked"} />
              <span
                className={styles.buttonText}
              >
                Language
              </span>
            </span>
            {showLanguage && (
              <div className={styles.listaLanguage}>
                <ul>
                  {languages.map(language => (
                    <li className={styles.itemLista} key={language.id}>
                      <div className={styles.containerItemLista}>
                        <input
                          type="checkbox"
                          id={language.id}
                          onChange={handleChangeStateLanguage}
                          checked={language.checked}
                          className={styles.inputItemLista}
                        />
                        <label
                          className={styles.labelItemLista}
                          htmlFor={language.id}
                        >
                          {language.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search