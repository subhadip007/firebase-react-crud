import React, { useState } from 'react'
import firebase from '../firebase'
import '../styles/update.css'
import { Button, Card, Image, Modal, Icon } from 'semantic-ui-react'

function Person (props) {
  const [openfirst, setOpenfirst] = useState(false)
  const [opensecond, setOpensecond] = useState(false)
  const storage = firebase.storage()

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
        <Image rounded floated='left' size='tiny' src={props.DP} />
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
              <Button icon labelPosition='left' primary>
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
									// delUser()
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
