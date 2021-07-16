import React, { useState } from 'react'
import firebase from './firebase'
import {
	Button,
	Container,
	TextArea,
	Form,
	Grid,
	Input,
	Segment
} from 'semantic-ui-react'

function Crud () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [yt, setYt] = useState('')
  const [ig, setIg] = useState('')
  const [li, setLi] = useState('')
  const [image, setImage] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleAddUser = () => {
    const storage = firebase.storage()

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
				'state_changed',
				snapshot => {},
				error => {
  console.log(error)
},
				() => {
  storage.ref('images').child(image.name).getDownloadURL().then(url => {
    firebase.firestore().collection('UserInfo').add({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Description: description,
      Youtube: yt,
      Instagram: ig,
      LinkedIn: li,
      Cover: url
    })
  })
}
			)
    }
  }

  return (
    <div className='ui hidden divider'>
      <Container>
        <Grid>
          <Grid.Row columns='2'>
            <Grid.Column>
              <Segment>
                <Form>
                  <Form.Field required>
                    <label>First Name</label>
                    <Input
                    required
                    placeholder='First Name'
                    focus
                    value={firstName}
                    onChange={e => {
                    setFirstName(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Last Name</label>
                    <Input
                    required
                    placeholder='Last Name'
                    focus
                    value={lastName}
                    onChange={e => {
                    setLastName(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Email</label>
                    <Input
                    required
                    placeholder='Email'
                    type='email'
                    focus
                    value={email}
                    onChange={e => {
                    setEmail(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Description</label>
                    <TextArea
                    required
                    placeholder='Tell us more'
                    style={{ minHeight: 50, maxHeight: 100 }}
                    value={description}
                    onChange={e => {
                    setDescription(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field>
                    <label>YouTube Link</label>
                    <Input
                    placeholder='Your channel link'
                    focus
                    value={yt}
                    onChange={e => {
                    setYt(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field>
                    <label>Instagram Link</label>
                    <Input
                    placeholder='Your profile link'
                    focus
                    value={ig}
                    onChange={e => {
                    setIg(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field>
                    <label>LinkedIn Link</label>
                    <Input
                    placeholder='Your profile link'
                    focus
                    value={li}
                    onChange={e => {
                    setLi(e.target.value)
                  }}
										/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Upload cover image</label>
                    <Input
                    required
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
										/>
                  </Form.Field>
                  <Form.Field>
                    <Button
                    onClick={() => {
                    handleAddUser()
                  }}
                    positive
										>
											Add User
										</Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default Crud
