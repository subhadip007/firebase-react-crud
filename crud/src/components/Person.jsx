import React, { useState } from 'react'
import firebase from '../firebase'
import '../styles/update.css'
import roles from './Roles'
import batches from './Batches'
import { v4 as uuidv4 } from 'uuid'
import { Button, Card, Image, Modal, Icon, Form } from 'semantic-ui-react'

function Person (props) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [description, setDescription] = useState('')
  const [passyear, setPassyear] = useState('')
  const [ig, setIg] = useState('')
  const [li, setLi] = useState('')
  const [image, setImage] = useState('')
  const [openfirst, setOpenfirst] = useState(false)
  const [opensecond, setOpensecond] = useState(false)
  const storage = firebase.storage()

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const getData = () => {
    firebase
			.firestore()
			.collection('UserInfo')
			.where('Email', '==', props.Email)
			.get()
			.then(snapshot => {
  const doc = snapshot.docs[0]
  const user = doc.data()
  setFullName(user.FullName)
  setEmail(user.Email)
  setPosition(user.Position)
  setDescription(user.Description)
  setPassyear(user.PassoutYear)
  setIg(user.Instagram)
  setLi(user.LinkedIn)
})
  }

  const updUser = () => {
    firebase
			.firestore()
			.collection('UserInfo')
			.where('Email', '==', props.Email)
			.get()
			.then(docs => {
  docs.forEach(doc => {
    let userRef = doc.id
    let imgRef = storage.refFromURL(doc.data().DP)
    imgRef.delete().then(() => {
      const storage = firebase.storage()
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
    if (image != null) {
      firebase
											.firestore()
											.collection('UserInfo')
											.doc(userRef)
											.update({
  FullName: fullName,
  Email: email,
  Position: position,
  Description: description,
  PassoutYear: passyear,
  Instagram: ig,
  LinkedIn: li,
  DP: url
})
    } else {
      firebase
											.firestore()
											.collection('UserInfo')
											.doc(userRef)
											.update({
  FullName: fullName,
  Email: email,
  Position: position,
  Description: description,
  PassoutYear: passyear,
  Instagram: ig,
  LinkedIn: li
})
    }
  })
}
						)
    })
  })
})
  }

  const delUser = () => {
    firebase
			.firestore()
			.collection('UserInfo')
			.where('Email', '==', props.Email)
			.get()
			.then(docs => {
  docs.forEach(doc => {
    let imgRef = storage.refFromURL(doc.data().DP)
    imgRef
						.delete()
						.then(() => {
  doc.ref.delete()
})
						.catch(err => {
  console.log(err)
})
  })
})
  }

  return (
    <Card id='dataObject'>
      <Card.Content>
        <Image
          rounded
          floated='left'
          height='80px'
          width='80px'
          src={props.DP}
				/>
        <Card.Header>
          {props.FullName}
        </Card.Header>
        <Card.Meta>
          {props.Position}
        </Card.Meta>
        <Card.Meta>
          {props.Email}
        </Card.Meta>
        <Card.Meta>
          {props.PassoutYear}
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <div className='ui two buttons'>
          <Modal
            onClose={() => setOpenfirst(false)}
            onOpen={() => setOpenfirst(true)}
            open={openfirst}
            trigger={
              <Button
                icon
                labelPosition='left'
                primary
                onClick={() => getData()}
							>
                <Icon name='edit' />
								Edit User
							</Button>
						}
					>
            <Modal.Header>Warning! Are you sure?</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <p>This action updates the data for the selected student.</p>
              </Modal.Description>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input
                    required
                    placeholder={fullName}
                    focus
                    value={fullName}
                    onChange={e => {
                    setFullName(e.target.value)
                  }}
									/>
                  <Form.Input
                    required
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
									/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Select
                    required
                    fluid
                    clearable
                    search
                    options={roles}
                    placeholder={position}
                    value={position}
                    onChange={e => {
                    setPosition(e.target.innerText)
                  }}
									/>
                  <Form.Select
                    required
                    fluid
                    clearable
                    search
                    options={batches}
                    placeholder={passyear}
                    value={passyear}
                    onChange={e => {
                    setPassyear(e.target.innerText)
                  }}
									/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    required
                    focus
                    fluid
                    placeholder={email}
                    value={email}
                    onChange={e => {
                    setEmail(e.target.value)
                  }}
									/>
                  <Form.Input
                    focus
                    fluid
                    placeholder={ig}
                    value={ig}
                    onChange={e => {
                    setIg(e.target.value)
                  }}
									/>
                  <Form.Input
                    focus
                    fluid
                    placeholder={li}
                    value={li}
                    onChange={e => {
                    setLi(e.target.value)
                  }}
									/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.TextArea
                    required
                    maxLength='140'
                    placeholder={description}
                    style={{ minHeight: 50, maxHeight: 100 }}
                    value={description}
                    onChange={e => {
                    setDescription(e.target.value)
                  }}
									/>
                </Form.Group>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                icon
                labelPosition='left'
                onClick={() => setOpenfirst(false)}
                positive
							>
                <Icon name='reply' />
								No, take me back
							</Button>
              <Button
                content='Yes, Update'
                labelPosition='right'
                icon='edit'
                onClick={() => {
                  updUser()
                  setOpenfirst(false)
                }}
                primary
							/>
            </Modal.Actions>
          </Modal>
          <Modal
            onClose={() => setOpensecond(false)}
            onOpen={() => setOpensecond(true)}
            open={opensecond}
            trigger={
              <Button icon labelPosition='left' negative>
                <Icon name='trash alternate outline' />
								Delete User
							</Button>
						}
					>
            <Modal.Header>Warning! Are you sure?</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <p>
									This action deletes all data for the selected student
									permanently.
								</p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                icon
                labelPosition='left'
                onClick={() => setOpensecond(false)}
                positive
							>
                <Icon name='reply' />
								No, take me back
							</Button>
              <Button
                content='Yes, Delete'
                labelPosition='right'
                icon='trash alternate outline'
                onClick={() => {
                  delUser()
                  setOpensecond(false)
                }}
                negative
							/>
            </Modal.Actions>
          </Modal>
        </div>
      </Card.Content>
    </Card>
  )
}
export default Person
