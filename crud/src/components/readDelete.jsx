import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import Person from './Person'
import { Link } from 'react-router-dom'
import '../styles/update.css'
import {
	Container,
	Card,
	Segment,
	Form,
	Input,
	Button,
	Icon
} from 'semantic-ui-react'

function ReadDelete () {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    let details = []
    firebase.firestore().collection('UserInfo').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        const person = {
          FullName: doc.data().FullName,
          Position: doc.data().Position,
          Email: doc.data().Email,
          DP: doc.data().DP
        }
        details.push(person)
      })
      setPersons(details)
    })
  }, [])

  return (
    <div className='ui hidden'>
      <Container className='upd'>
        <Segment>
          <Form>
            <Form.Field required>
              <label>Search Name</label>
              <Input
                autoComplete='off'
                id='search'
                required
                placeholder='Enter Name for update/delete'
                focus
                type='text'
                onChange={e => setSearch(e.target.value)}
							/>
            </Form.Field>
            <Card.Group id='card'>
              {persons
								.filter(val => {
  if (search === '') {
    return null
  } else if (
										val.FullName.toLowerCase().includes(search.toLowerCase())
									) {
    return val
  } else {
    return null
  }
})
								.map((val, key) => {
  return (
    <div key={key} id='persons'>
      <Person
        FullName={val.FullName}
        Position={val.Position}
        Email={val.Email}
        DP={val.DP}
        PassoutYear={val.PassoutYear}
											/>
    </div>
  )
})}
            </Card.Group>
            <Link id='util' to='/'>
              <Button icon labelPosition='left' positive>
                <Icon name='reply' />
								Go back
							</Button>
            </Link>
          </Form>
        </Segment>
      </Container>
    </div>
  )
}

export default ReadDelete
