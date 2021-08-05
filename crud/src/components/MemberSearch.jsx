import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import Card from './Card'
import roles from './Roles'
import { Container, Dropdown, Segment, Form } from 'semantic-ui-react'

function MemberSearch () {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(
		() => {
  let details = []
  firebase
				.firestore()
				.collection('UserInfo')
				.where('Position', '==', `${search}`)
				.get()
				.then(querySnapshot => {
  querySnapshot.docs.forEach(doc => {
    console.log(doc.data())
    const person = {
      FullName: doc.data().FullName,
      Position: doc.data().Position,
      Description: doc.data().Description,
      Instagram: doc.data().Instagram,
      Linkedin: doc.data().Linkedin,
      Email: doc.data().Email,
      DP: doc.data().DP
    }
    details.push(person)
  })
  setPersons(details)
})
},
		[search]
	)

  return (
    <div>
      <Container>
        <Segment>
          <Form>
            <Form.Field required>
              <label>Show members for this role</label>
              <Dropdown
                placeholder='Select role'
                fluid
                clearable
                selection
                search
                options={roles}
                onChange={e => {
                  setSearch(e.target.innerText)
                }}
							/>
            </Form.Field>
          </Form>
        </Segment>
        <Segment>
          {persons.map((val, key) => {
            return (
              <div key={key} id='persons'>
                <Card
                  name={val.FullName}
                  job={val.Position}
                  about={val.Description}
                  iglink={val.Instagram}
                  lilink={val.Linkedin}
                  email={val.Email}
                  image={val.DP}
								/>
              </div>
            )
          })}
        </Segment>
      </Container>
    </div>
  )
}

export default MemberSearch
