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
  const [secondImage, setSecondImage] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleChange1 = e => {
    if (e.target.files[0]) {
      setSecondImage(e.target.files[0])
    }
  }

  const handleAddUser = () => {
    const storage = firebase.storage()

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const uploadTask = storage.ref(`cover_img/${image.name}`).put(image)
      const uploadTask1 = storage
				.ref(`dp_img/${secondImage.name}`)
				.put(secondImage)
      uploadTask.on(
				'state_changed',
				snapshot => {},
				error => {
  console.log(error)
},
				() => {
  storage
						.ref('cover_img')
						.child(image.name)
						.getDownloadURL()
						.then(url => {
  firebase.firestore().collection('UserInfo').add({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Description: description,
    Youtube: yt,
    Instagram: ig,
    LinkedIn: li,
    Cover: url,
    DP: null
  })
})
}
			)

      uploadTask1.on(
				'state_changed',
				snapshot => {},
				error => {
  console.log(error)
},
				() => {
  storage
						.ref('dp_img')
						.child(secondImage.name)
						.getDownloadURL()
						.then(url => {
  firebase
								.firestore()
								.collection('UserInfo')
								.where('Email', '==', email)
								.get()
								.then(querySnapshot => {
  querySnapshot.forEach(doc => {
    doc.ref.update({ DP: url })
  })
})
								.catch(err => {
  console.log(err)
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
                    <label>Upload DP image</label>
                    <Input
                    required
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
										/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Upload Cover image</label>
                    <Input
                    required
                    type='file'
                    accept='image/*'
                    onChange={handleChange1}
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