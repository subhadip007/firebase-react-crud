import React, { useState } from 'react'
import Card from './Card'
import roles from './Roles'
import firebase from '../firebase'
import '../styles/Crud.css'
import {
	Button,
	Container,
	TextArea,
	Form,
	Grid,
	Input,
	Segment,
	Dropdown
} from 'semantic-ui-react'

let previewImage = ''
let previewSecondImage = ''

function Crud () {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [description, setDescription] = useState('')
  const [passyear, setPassyear] = useState('')
  const [ig, setIg] = useState('')
  const [li, setLi] = useState('')
  const [image, setImage] = useState('')
  const [secondImage, setSecondImage] = useState('')
  const [disable, setDisable] = useState(false)

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      previewImage = URL.createObjectURL(e.target.files[0])
    }
  }

  const handleChange1 = e => {
    if (e.target.files[0]) {
      setSecondImage(e.target.files[0])
      previewSecondImage = URL.createObjectURL(e.target.files[0])
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
    Email: email,
    PassoutYear: passyear,
    Position: position,
    Description: description,
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

    setDisable(true)

    setTimeout(() => {
      setDisable(false)
    }, 5000)
  }

  return (
    <div className='ui hidden'>
      <Container className='crud'>
        <Segment>
          <Grid columns={2} centered stackable>
            <Grid.Column>
              <Form>
                <Form.Field required>
                  <label>Name</label>
                  <Input
                    required
                    placeholder='Enter Name'
                    focus
                    value={firstName}
                    onChange={e => {
                    setFirstName(e.target.value)
                  }}
									/>
                </Form.Field>
                <Form.Field required>
                  <label>Position</label>
                  <Dropdown
                    placeholder='Select Position'
                    fluid
                    clearable
                    selection
                    search
                    options={roles}
                    value={position}
                    onChange={e => {
                    setPosition(e.target.innerText)
                  }}
									/>
                </Form.Field>
                <Form.Field required>
                  <label>Description</label>
                  <TextArea
                    required
                    maxLength='140'
                    placeholder='Tell us more'
                    style={{ minHeight: 50, maxHeight: 100 }}
                    value={description}
                    onChange={e => {
                    setDescription(e.target.value)
                  }}
									/>
                </Form.Field>
                <Form.Field required>
                  <label>Email</label>
                  <Input
                    required
                    placeholder='Enter Email'
                    type='email'
                    focus
                    value={email}
                    onChange={e => {
                    setEmail(e.target.value)
                  }}
									/>
                </Form.Field>
                <Form.Field required>
                  <label>Passout Year</label>
                  <Input
                    required
                    placeholder='Enter Passing out year'
                    focus
                    value={passyear}
                    onChange={e => {
                    setPassyear(e.target.value)
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
                  <label>Instagram Link</label>
                  <Input
                    placeholder='Enter profile link'
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
                    placeholder='Enter profile link'
                    focus
                    value={li}
                    onChange={e => {
                    setLi(e.target.value)
                  }}
									/>
                </Form.Field>
                <Form.Field>
                  <Button
                    onClick={() => {
                    handleAddUser()
                  }}
                    disabled={disable}
                    positive
									>
										Add User
									</Button>
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Card
                name={firstName}
                about={description}
                job={position}
                email={email}
                iglink={ig}
                lilink={li}
                image={previewImage}
                cover={previewSecondImage}
							/>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </div>
  )
}

export default Crud
