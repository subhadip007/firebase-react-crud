import React, { useState, useEffect } from 'react'
import '../styles/Card.css'
import prevImg from '../assets/portoflio_face.jpg'
import prevCover from '../assets/portoflio_cover.jpg'

function Card ({ name, about, job, email, iglink, lilink, image, cover }) {
  let mail = 'mailto:' + email
  let prevName = 'Enter name here'
  let prevJob = 'Enter position here'
  let prevDesc =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'

  const [naame, setNaame] = useState(prevName)
  const [joob, setJoob] = useState(prevJob)
  const [desc, setDesc] = useState(prevDesc)
  const [img, setImg] = useState(prevImg)
  const [cov, setCov] = useState(prevCover)

  useEffect(
		() => {
  if (name) {
    setNaame(name)
  }

  if (job) {
    setJoob(job)
  }

  if (about) {
    setDesc(about)
  }

  if (image) {
    setImg(image)
  }

  if (cover) {
    setCov(cover)
  }
},
		[name, job, about, image, cover]
	)

  return (
    <div className='Card'>
      <div
        className='upper-container'
        style={{ backgroundImage: `url(${cov})`, backgroundSize: 'cover' }}
			>
        <div className='image-container'>
          <img src={img} alt='dp' height='100px' width='100px' />
        </div>
      </div>
      <div className='lower-container'>
        <h3>
          {naame}
        </h3>
        <h4>
          {joob}
        </h4>
        <p>
          {desc}
        </p>
        <div className='socials'>
          <a href={mail} target='_blank' rel='noreferrer'>
            <i className='far fa-envelope mail' />
          </a>
          <a href={iglink} target='_blank' rel='noreferrer'>
            <i className='fab fa-instagram ig' />
          </a>
          <a href={lilink} target='_blank' rel='noreferrer'>
            <i className='fab fa-linkedin-in li' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Card
