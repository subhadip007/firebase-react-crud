import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import roles from './Roles'
import batches from './Batches'
import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import '../styles/Crud.css'
import {
	Button,
	Container,
	TextArea,
	Form,
	Grid,
	Input,
	Segment,
	Dropdown,
	Icon
} from 'semantic-ui-react'

let previewImage = ''

function Crud () {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [description, setDescription] = useState('')
  const [passyear, setPassyear] = useState('')
  const [ig, setIg] = useState('')
  const [li, setLi] = useState('')
  const [image, setImage] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      previewImage = URL.createObjectURL(e.target.files[0])
    }
  }

  const handleAddUser = () => {
    const storage = firebase.storage()

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      let uuid = uuidv4()
      const uploadTask = storage.ref(`dp_img/${uuid}`).put(image)
      uploadTask.on(
				'state_changed',
				snapshot => {},
				error => {
  console.log(error)
},
				() => {
  storage.ref('dp_img').child(uuid).getDownloadURL().then(url => {
    firebase.firestore().collection('UserInfo').add({
      FullName: fullName,
      Email: email,
      PassoutYear: passyear,
      Position: position,
      Description: description,
      Instagram: ig,
      LinkedIn: li,
      DP: url
    })
  })
}
			)
    }
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
                    value={fullName}
                    onChange={e => {
                    setFullName(e.target.value)
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
                  <Dropdown
                    placeholder='Batch Delete selected year'
                    fluid
                    clearable
                    selection
                    search
                    options={batches}
                    value={passyear}
                    onChange={e => {
                    setPassyear(e.target.innerText)
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
                <Form.Field id='utility'>
                  <Button
                    icon
                    labelPosition='left'
                    onClick={() => {
                    handleAddUser()
                  }}
                    positive
									>
                    <Icon name='user plus' />
										Add User
									</Button>
                  <Link id='util' to='/update'>
                    <Button icon labelPosition='left' primary>
                    <Icon name='edit' />
											Update User
										</Button>
                  </Link>
                  <Link id='util' to='/delete'>
                    <Button icon labelPosition='left' negative>
                    <Icon name='external alternate' />
											Batch Delete
										</Button>
                  </Link>
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Card
                name={fullName}
                about={description}
                job={position}
                email={email}
                iglink={ig}
                lilink={li}
                image={previewImage}
							/>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </div>
  )
}

export default Crud
