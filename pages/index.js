import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dbConnect from '../utils/dbConnect'
import User from '../models/User'
import { useState } from 'react'
import fetch from 'unfetch'
import _ from 'lodash'

 function Home({ users }) {

  const [userState, setUserState] =   useState(users)
  var handleSearch = _.debounce((val) => {
    fetch('/api/users/search?term='+val, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    })
  .then( r => r.json() )
  .then( data => setUserState(data.users) )
  }, 100);

  return (
    <div>
      <Head>
        <title> Search Page App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Search Page</h3>
        <input type="search" onChange={e => handleSearch(e.target.value)} name="search" placeholder="search user" />
      <table>
        {
          userState.map((user) => (<tr>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
          </tr>))
        }

      </table>
    </div>
  )
}


export async function getServerSideProps() {
  await dbConnect()
  const result = await User.find({}).limit(50).lean();
  return { props: { users: result.map(({displayName, email, phoneNumber}) => ({ displayName, email, phoneNumber}))  } }
}

export default Home;