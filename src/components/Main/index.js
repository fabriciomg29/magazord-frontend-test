import React from 'react';
import Content from '../Content'
import Profile from '../Profile'
import styles from './Main.module.scss'
import { useEffect, useState } from 'react'
import User from '../../hooks/User'

export const DataContext = React.createContext()

const Main = () => {

  const [dataUser, setDataUser] = useState(null)

  useEffect(() => {
    const getGitUser = async () => {

      const dataUser = localStorage.getItem('dataUser')

      if(dataUser) {
        setDataUser(JSON.parse(dataUser))
        return
      }
      
      const gitUser = await User.getGitUser()
      const gitRepos = await User.getGitRepos()
      const gitStarred = await User.getGitStarred()

      const user = {
        avatar_url: gitUser.avatar_url,
        name: gitUser.name,
        bio: gitUser.bio,
        company: gitUser.company,
        location: gitUser.location,
        blog: gitUser.blog,
        twitter_username: gitUser.twitter_username,
      }

      const listRepos = gitRepos.map(repo => {
        return {
          id: repo.id,
          full_name: repo.full_name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          clone_url: repo.clone_url,
          language: repo.language,
          fork: repo.fork,
          archived: repo.archived,
          mirrors: repo.mirror_url
        }
      })

      const listStarreds = gitStarred.map(starred => {
        return {
          id: starred.id,
          full_name: starred.full_name,
          description: starred.description,
          language: starred.language,
          forks_count: starred.forks_count,
          html_url: starred.owner.html_url,
          fork: starred.fork,
          archived: starred.archived,
          mirrors: starred.mirror_url
        }
      })

      const formatData = {
        user: user,
        'repos': listRepos,
        'starreds': listStarreds
      }

      setDataUser(formatData)
      localStorage.setItem('dataUser', JSON.stringify(formatData))
    }

    return () => {
      getGitUser()
    }
  }, [])

  return (
    <div>
      {dataUser && (
        <main>
          <div className={styles.container}>
            <DataContext.Provider value={dataUser}>
              <Profile />
              <Content />
            </DataContext.Provider>
          </div>
        </main>
      )}
    </div>
  )
}

export default Main