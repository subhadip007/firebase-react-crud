import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import batches from './Batches'
import '../styles/delete.css'
import {
	Button,
	Container,
	Form,
	Grid,
	Segment,
	Dropdown,
	Icon,
	Modal
} from 'semantic-ui-react'

function DelBatch () {
  const [year, setYear] = useState('')
  const [open, setOpen] = useState(false)
  const storage = firebase.storage()

  const delUser = () => {
    if (year) {
      firebase
				.firestore()
				.collection('UserInfo')
				.where('PassoutYear', '==', year)
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
    } else {
      alert('Please select a year.')
    }
    setYear('')
  }

  return (
    <div className='ui hidden'>
      <Container className='del'>
        <Segment>
          <Grid columns={1} stackable>
            <Grid.Column>
              <Form>
                <Form.Field required>
                  <label>Select year</label>
                  <Dropdown
                    placeholder='Batch Delete selected year'
                    fluid
                    clearable
                    selection
                    search
                    required
                    options={batches}
                    value={year}
                    onChange={e => {
                    setYear(e.target.innerText)
                  }}
									/>
                </Form.Field>
                <Form.Field>
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                    <Button icon labelPosition='left' negative>
                    <Icon name='trash alternate outline' />
												Delete User Batch
											</Button>
										}
									>
                    <Modal.Header>Warning! Are you sure?</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                    <p>
													This action deletes all the data permanently for the
													students of the selected batch.
												</p>
                  </Modal.Description>
                  </Modal.Content>
                    <Modal.Actions>
                    <Button
                    icon
                    labelPosition='left'
                    onClick={() => setOpen(false)}
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
                    setOpen(false)
                  }}
                    negative
											/>
                  </Modal.Actions>
                  </Modal>
                  <Link id='reply' to='/'>
                    <Button icon labelPosition='left' positive>
                    <Icon name='reply' />
											Go back
										</Button>
                  </Link>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </div>
  )
}

export default DelBatch
