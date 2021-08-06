import React, { useState, useEffect } from 'react'
import '../styles/Card.css'
import prevImg from '../assets/portoflio_face.jpg'
import Cover0 from '../assets/cover/cover0.jpg'
import Cover1 from '../assets/cover/cover1.jpg'
import Cover2 from '../assets/cover/cover2.jpg'
import Cover3 from '../assets/cover/cover3.jpg'
import Cover4 from '../assets/cover/cover4.jpg'
import Cover5 from '../assets/cover/cover5.jpg'
import Cover6 from '../assets/cover/cover6.jpg'
import Cover7 from '../assets/cover/cover7.jpg'

let cov = Cover0

function Card ({ name, about, job, email, iglink, lilink, image }) {
  let mail = 'mailto:' + email
  let prevName = 'Enter name here'
  let prevJob = 'Enter position here'
  let prevDesc =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'

  const [naame, setNaame] = useState(prevName)
  const [joob, setJoob] = useState(prevJob)
  const [desc, setDesc] = useState(prevDesc)
  const [img, setImg] = useState(prevImg)

  useEffect(
		() => {
  if (name) {
    setNaame(name)
  }

  if (job) {
    setJoob(job)
    switch (job) {
      case 'Administrator':
        cov = Cover0
        break

      case 'Coordinator':
        cov = Cover1
        break

      case 'Director':
        cov = Cover2
        break

      case 'Writing Staff':
        cov = Cover2
        break

      case 'Actor':
        cov = Cover3
        break

      case 'Cinematographer':
        cov = Cover2
        break

      case 'Photographer':
        cov = Cover2
        break

      case 'Costume Designer':
        cov = Cover2
        break

      case 'Sound Designer':
        cov = Cover4
        break

      case 'Video Editor':
        cov = Cover4
        break

      case 'Graphic Designer':
        cov = Cover4
        break

      case 'Marketing':
        cov = Cover5
        break

      case 'HR':
        cov = Cover5
        break

      case 'Model':
        cov = Cover6
        break

      default:
        cov = Cover7
        break
    }
  }

  if (about) {
    setDesc(about)
  }

  if (image) {
    setImg(image)
  }
},
		[name, job, about, image]
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
